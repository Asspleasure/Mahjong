import React, {useEffect, useRef, useState} from 'react';
import Card from "../card";
import '../../styles/variables.css';
import styles from './Board.module.css';
import {parsingShuffles, createPrimeArray, shuffle} from "../../utils";

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
                (item) => isEqualIDSelectedCard(item, {firstCard, secondCard}) ? ({...item, stateCard: 'INACTIVE'}) : item)
            );
        } else {
            closePairID.current = setTimeout(() => {
                closePair();
                closePairID.current = null;
            }, 1000);

            return () => clearTimeout(closePairID.current);
        }
    }, [activeCards.length]);

    function isSameCard(id) {
        return activeCards.length === 1 && id === activeCards[0];
    }

    function isEqualIDSelectedCard (card, {firstCard, secondCard}) {
       return card.id === firstCard.id || card.id === secondCard.id;
    }

    function isEqualCards(first, second) {
        return first.number === second.number;
    }

    function closePair() {
        setShuffleArr((cards) => cards.map(
            (card) => activeCards.some((activeCard) => activeCard.id === card.id) ? ({...card, isVisible: false, stateCard: 'IN-PROGRESS'}) : card
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

        if (isSameCard(id)) {
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
        const classes = [];

        if(card.isVisible) {
            classes.push(styles.dontTouch);
        }

        if(card.stateCard === 'IS-ACTIVE') {
            classes.push(styles.active)
        }

        if(card.stateCard === 'INACTIVE') {
            classes.push(styles.inactive)
        }

        return classes;
    }

    return (
        <div className={styles.center}>
            <h1 className={styles.h1}>Mahjong</h1>
            <ul className={`${styles.ul} ${styles.container}`}>
                {shuffleArr.map((card) => (
                        <Card
                            className={activeStylesCard(card).join(' ')}
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
