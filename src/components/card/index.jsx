import styles from './Card.module.css'
import classNames from 'classnames';

const Card = (props) => {
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