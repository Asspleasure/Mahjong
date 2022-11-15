import {CARD_STATES} from 'shares/constants'

type StateCard = `${CARD_STATES}`

export interface ICard {
    id: number,
    isVisible: boolean,
    number: number,
    stateCard: StateCard
}