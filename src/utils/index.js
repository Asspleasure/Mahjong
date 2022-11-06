import {constants} from 'shares/constants'
export function isPrime(num) {

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return num > 1;
}

export function createPrimeArray(a, b) {
    let arr = [];

    while (a !== b) {
        arr.push(a);
        a++;
    }

    let primeArr = arr.filter(n => isPrime(n));

    return [...primeArr, ...primeArr];
}

export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function parsingShuffles(arr) {

    return arr.reduce((acum, item, index) => {
        acum[index] = {
            id: index,
            isVisible: true,
            number: item,
            stateCard: constants.IN_PROGRESS
        };

        return acum;
        }, []
    )
}
