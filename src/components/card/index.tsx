import styles from './Card.module.css'
import classNames from 'classnames';
import {ICard} from 'utils/interfaces/Card.interface';

type Props = {
    card: ICard,
    onClick: (id: number) => void,
    className: string
}

const Card: React.FC<Props> = (props) => {
    const {card, onClick, className} = props;

    const classes = classNames(
        styles.card,
        className,
    );

    return (
        <li className={styles.li}>
            <span className={classes} onClick={() => onClick(card.id)}>
                {(card.isVisible && card.number)}
            </span>
        </li>
    );
};

export default Card;