import React from "react";
import styles from "./PriceCard.module.scss";
import bmv from "../../../../images/bmv.png";
import mersedes from "../../../../images/mersedes.png";
import tesla from "../../../../images/tesla.png";
import classNames from "classnames";
import PropTypes from "prop-types"

const PriceCard = ({ info, car, changeCar }) => {
    const images = [bmv, tesla, mersedes];
    const styledWrapper = classNames(styles.card__wrapper,{[styles.active]: info.title === car})

    return (
        <div className={styledWrapper} onClick={()=>changeCar(info.title)}>
            <div className={styles.card__info}>
                <div className={styles.title}>{info.title}</div>
                <div className={styles.sub__title}>Стоимость</div>
                <div className={styles.price}>{info.price} ₽ </div>
            </div>
            <div className={styles.card__img}>
                <img src={images[info.img]} alt=''  className={styles.img}/>
            </div>
        </div>
    );
};

PriceCard.propTypes = {
    info: PropTypes.object,
    car: PropTypes.string,
    changeCar: PropTypes.func
};

export default PriceCard;
