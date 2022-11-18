import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import Card from '../card';
import '../../styles/variables.css';
import styles from './Board.module.css';
import {CARD_STATES} from 'shares/constants';
import classNames from 'classnames';
import {ICard} from 'utils/interfaces/Card.interface';
import {
    parsingShuffles, createPrimeArray, shuffle,
    isSameCard, isEqualCards, isEqualIDSelectedCard
} from "../../utils";

const Board: React.FC = () => {
    const [shuffleArr, setShuffleArr] = useState<Array<ICard>>([]);
    const [activeCards, setActiveCards] = useState<Array<ICard>>([]);
    const closePairID = React.useRef<null | NodeJS.Timeout| number>(null);

    useEffect(() => {
        let shuffledNumbers = shuffle(createPrimeArray(1, 59));
        setShuffleArr(parsingShuffles(shuffledNumbers));

        let timeoutId: null | ReturnType<typeof setTimeout> = null

        timeoutId = setTimeout(() => {
            setShuffleArr((cards) => cards.map((item) => ({
                ...item,
                isVisible: false
            })));
        }, 5000);
    }, []);

    useEffect(() => {
        if (activeCards.length < 2) {
            return;
        }

        const [firstCard, secondCard] = activeCards;

        if (isEqualCards(firstCard, secondCard)) {
            setActiveCards(() => []);
            setShuffleArr((prevCards) => prevCards.map(
                (item) => isEqualIDSelectedCard(item, {firstCard, secondCard}) ? ({...item, stateCard: CARD_STATES.INACTIVE}) : item)
            );
        } else {
            closePairID.current = setTimeout(() => {
                closePair();
                closePairID.current = null;
            }, 1000);

            return () => {
                if (closePairID.current !== null) {
                    return clearTimeout(closePairID.current);
                }
            }
        }
    }, [activeCards.length]);

    function closePair() {
        setShuffleArr((cards) => cards.map(
            (card) => activeCards.some((activeCard) => activeCard.id === card.id) ? ({...card, isVisible: false, stateCard: CARD_STATES.IN_PROGRESS}) : card
            ));
        setActiveCards([]);
    }

    const openCard = (id: number, options) => toggle(id, options);

    function toggle(id, { isVisible, stateCard }) {
        setShuffleArr(shuffleArr.map((item) => id === item.id ? ({...item, isVisible, stateCard}) : item));
    }

    function handleClickCard(id: number) {

        if (isSameCard(id, activeCards)) {
            return;
        }

        if (activeCards.length < 2) {
            openCard(id, {stateCard: CARD_STATES.IS_ACTIVE, isVisible: true});
            const clickedCard = shuffleArr.find((item) => item.id === id);

            if(typeof clickedCard !== 'undefined') {
                setActiveCards((activeCards) => [...activeCards, clickedCard] as Array<ICard>);
            }

            return;
        }
    }

    function activeStylesCard (card) {
         const localStyles = classNames (
            {[styles.dontTouch]:card.isVisible},
            {[styles.active]:card.stateCard === CARD_STATES.IS_ACTIVE},
            {[styles.inactive]:card.stateCard === CARD_STATES.INACTIVE},
       )

        return localStyles;
    }

    return (
        <div className={styles.center}>
            <h1 className={styles.h1}>Mahjong</h1>
            <ul className={`${styles.ul} ${styles.container}`}>
                {shuffleArr.map((card) => (
                        <Card
                            className={activeStylesCard(card)}
                            key={card.id}
                            card={card}
                            onClick={handleClickCard}
                        />
                    )
                )}
            </ul>
        </div>

    );
}

export default Board;
