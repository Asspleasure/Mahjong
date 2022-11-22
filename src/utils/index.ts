import {CARD_STATES} from 'shares/constants'

export function isPrime(num: number) {

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return num > 1;
}

export function createPrimeArray(a: number, b: number) {
    let arr: Array<number> = [];

    while (a !== b) {
        arr.push(a);
        a++;
    }

    let primeArr = arr.filter(n => isPrime(n));

    return [...primeArr, ...primeArr];
}

export function shuffle(arr: number[]) {
    let currentIndex = arr.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

export function parsingShuffles(arr) {

    return arr.reduce((acum, item, index) => {
        acum[index] = {
            id: index,
            isVisible: true,
            number: item,
            stateCard: CARD_STATES.IN_PROGRESS
        };

        return acum;
        }, []
    )
}

export function isSameCard(id: number, activeCards) {
    return activeCards.length === 1 && id === activeCards[0];
}

export function isEqualIDSelectedCard (card, {firstCard, secondCard}) {
    return card.id === firstCard.id || card.id === secondCard.id;
}

export function isEqualCards(first, second) {
    return first.number === second.number;
}
