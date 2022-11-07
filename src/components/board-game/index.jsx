import React, {useEffect, useRef, useState} from 'react';
import Card from "../card";
import '../../styles/variables.css';
import styles from './Board.module.css';
import {constants} from 'shares/constants';
import classnames from "classnames"
import {
    parsingShuffles, createPrimeArray, shuffle,
    isSameCard, isEqualCards, isEqualIDSelectedCard
} from "../../utils";

function Board() {
    const [shuffleArr, setShuffleArr] = useState([]);
    const [activeCards, setActiveCards] = useState([]);
    const closePairID = useRef(null);

    useEffect(() => {
        let shuffledNumbers = shuffle(createPrimeArray(1, 59));
        setShuffleArr(parsingShuffles(shuffledNumbers));

        setTimeout(() => {
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
                (item) => isEqualIDSelectedCard(item, {firstCard, secondCard}) ? ({...item, stateCard: constants.INACTIVE}) : item)
            );
        } else {
            closePairID.current = setTimeout(() => {
                closePair();
                closePairID.current = null;
            }, 1000);

            return () => clearTimeout(closePairID.current);
        }
    }, [activeCards.length]);

    function closePair() {
        setShuffleArr((cards) => cards.map(
            (card) => activeCards.some((activeCard) => activeCard.id === card.id) ? ({...card, isVisible: false, stateCard: constants.IN_PROGRESS}) : card
            ));
        setActiveCards([]);
    }

    function openCard(id, options) {
        toggle(id, options);
    }

    function toggle(id, { isVisible, stateCard }) {
        setShuffleArr(shuffleArr.map((item) => id === item.id ? ({...item, isVisible, stateCard}) : item));
    }

    function handleClickCard(id) {

        if (isSameCard(id, activeCards)) {
            return;
        }

        if (activeCards.length < 2) {
            openCard(id, {stateCard: 'IS-ACTIVE', isVisible: true});

            const clickedCard = shuffleArr.find((item) => item.id === id);
            setActiveCards((activeCards) => [...activeCards, clickedCard]);

            return;
        }
    }

    function activeStylesCard (card) {
         const localStyles = classnames (
            {[styles.dontTouch]:card.isVisible},
            {[styles.active]:card.stateCard === constants.IS_ACTIVE},
            {[styles.inactive]:card.stateCard === constants.INACTIVE},
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
