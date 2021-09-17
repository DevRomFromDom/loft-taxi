import React, { useEffect, useState } from "react";
import styles from "./MapOrderForm.module.scss";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getAddresses, getRoute } from "../../../store";
import PriceCard from "./PriceCard";

const useStyles = makeStyles(() => ({
    formControl: {
        width: "90%",
        margin: "5px 4.67% 0 4.67%",
    },
    select: {
        height: "40px",
        textIndent: " 30px ",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "18px",
        lineHeight: "21px",
        marginTop: "5px",
        marginBottom: "5px",
        "&::before": {
            borderBottom: "none",
        },
        "&::after": {
            borderBottom: "1px solid #E0E0E0",
        },
        "&::focus": {
            borderBottom: "1px solid #E0E0E0",
        },
    },
}));

const prices = [
    { title: "Стандарт", price: 150, img: 0 },
    { title: "Премиум", price: 250, img: 1 },
    { title: "Бизнес", price: 300, img: 2 },
];

const MapOrderForm = ({ getAddresses, stateAddresses, getRoute }) => {
    const { register, handleSubmit } = useForm();
    const [addresses, setAddresses] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const classes = useStyles();
    const [car, setCar] = useState("Стандарт");
    const styledButton = classNames(styles.btn, {
        [styles.disabled]: !start || !end,
    });

    useEffect(() => {
        if (!stateAddresses[0]) {
            getAddresses();
        }
    }, [getAddresses, stateAddresses]);
    useEffect(() => {
        if (stateAddresses) {
            setAddresses(stateAddresses);
        }
    }, [stateAddresses]);
    const changeCar = (carTitle) => {
        setCar(carTitle);
    };

    const orderSubmit = async (data) => {
        await getRoute(data.start, data.end);
    };

    return (
        <div className={styles.form__wrapper}>
            <form
                className={styles.form__container}
                onSubmit={handleSubmit(orderSubmit)}
            >
                <div className={styles.select__form}>
                    <FormControl className={classes.formControl}>
                        {start ? <div className={styles.selectStart} /> : null}
                        <InputLabel>Откуда</InputLabel>

                        <Select
                            onChange={(e) => setStart(e.target.value)}
                            className={classes.select}
                            value={start}
                            inputProps={{
                                ...register("start"),
                                "data-testid": "start-id",
                            }}
                        >
                            {addresses
                                ? addresses
                                      .filter((el) => el !== end)
                                      .map((item) => (
                                          <MenuItem value={item} key={item}>
                                              {item}
                                          </MenuItem>
                                      ))
                                : null}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        {end ? <div className={styles.selectEnd} /> : null}
                        <InputLabel>Куда</InputLabel>
                        <Select
                            onChange={(e) => setEnd(e.target.value)}
                            className={classes.select}
                            value={end}
                            inputProps={{
                                ...register("end"),

                                "data-testid": "end-id",
                            }}
                        >
                            {addresses
                                ? addresses
                                      .filter((el) => el !== start)
                                      .map((item) => (
                                          <MenuItem value={item} key={item}>
                                              {item}
                                          </MenuItem>
                                      ))
                                : null}
                        </Select>
                    </FormControl>
                </div>
                <div className={styles.sub__form}>
                    <div className={styles.price__form}>
                        {prices
                            ? prices.map((el, index) => (
                                  <PriceCard
                                      key={index}
                                      info={el}
                                      car={car}
                                      value={el.title}
                                      changeCar={changeCar}
                                  />
                              ))
                            : null}
                    </div>
                    <div className={styles.submit__btn}>
                        <button
                            className={styledButton}
                            type='submit'
                            data-testid='btn-test'
                        >
                            Заказать
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
MapOrderForm.propTypes = {
    getAddresses: PropTypes.func,
    getRoute: PropTypes.func,
    stateAddresses: PropTypes.array,
};

export default connect(
    (state) => ({ stateAddresses: state.addresses.addresses }),
    {
        getAddresses,
        getRoute,
    }
)(MapOrderForm);
