import React, { useState, useEffect } from "react";
import styles from "./ProfileForm.module.scss";
import { ReactComponent as Logo } from "../../../images/svg/logo.svg";
import { ReactComponent as Tech } from "../../../images/svg/Tech.svg";
import { ReactComponent as Ellipse } from "../../../images/svg/Ellipse.svg";
import { MaskedCardNumber, MaskedDateNumber, MaskedCvcNumber } from "../masks";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import classNames from "classnames";
import { connect, useDispatch } from "react-redux";
import { setCard } from "../../../store";
import { useForm } from "react-hook-form";

const CssTextField = withStyles({
    root: {
        "& label": {
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "19px",
            fontFamily: "Roboto",
        },
        "& label.Mui-focused": {
            color: "#828282",
        },
        "& input": {
            fontFamily: "Roboto",
            color: "black",
            fontWeight: "bold",
            fontSize: "16px",
            lineHeight: "19px",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#828282",
        },
        "& .MuiInput-underline:before": {
            borderBottom: "2px solid #E4E4E4;",
        },
    },
})(TextField);

const ProfileForm = ({ card, token, closeForm }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [date, setDate] = useState("");
    const [cvc, setCvc] = useState("");

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (card.id || card.token) {
            setNumber(card.cardNumber);
            setCvc(card.cvc);
            setDate(card.expiryDate);
            setName(card.cardName);
        }

        return;
    }, [card]);

    const newCard = {
        id: card.id,
        cardNumber: number,
        expiryDate: date,
        cardName: name,
        cvc: cvc,
    };
    const cardSubmit = async (data) => {
        const { cardName, cardNumber, cvc, expiryDate } = data;
        if (JSON.stringify(card) === JSON.stringify(newCard)) {
            return;
        }
        dispatch(
            setCard({
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cardName: cardName,
                cvc: cvc,
                token: token,
            })
        );
        closeForm(false);
    };

    const styledButton = classNames(styles.save_btn, {
        [styles.disabled]:
            name.length === 0 ||
            number.length !== 19 ||
            cvc.length !== 3 ||
            date.length < 5 ||
            JSON.stringify(card) === JSON.stringify(newCard),
    });

    return (
        <div className={styles.profile__form_wrapper}>
            <form
                onSubmit={handleSubmit(cardSubmit)}
                className={styles.form_body}
            >
                <div className={styles.form_container_main}>
                    <div className={styles.profile_form__container}>
                        <div className={styles.form_input}>
                            <CssTextField
                                id='name'
                                label='Имя пользвователя'
                                fullWidth
                                error={false}
                                placeholder='Введите имя'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                {...register("cardName", { required: true })}
                                inputProps={{ "data-testid": "name-field" }}
                            />
                        </div>
                        <div className={styles.form_input}>
                            <CssTextField
                                {...register("cardNumber", { required: true })}
                                id='number'
                                label='Номер карты'
                                placeholder='0000 0000 0000 0000'
                                fullWidth
                                error={false}
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                InputProps={{
                                    inputComponent: MaskedCardNumber,
                                }}
                                inputProps={{ "data-testid": "number-field" }}
                            />
                        </div>
                        <div className={styles.form_card__info}>
                            <div className={styles.form_card_date}>
                                <CssTextField
                                    {...register("expiryDate", {
                                        required: true,
                                    })}
                                    id='form-date'
                                    label='MM/YY'
                                    fullWidth
                                    placeholder='00/00'
                                    error={false}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    InputProps={{
                                        inputComponent: MaskedDateNumber,
                                    }}
                                    inputProps={{ "data-testid": "date-field" }}
                                />
                            </div>
                            <div className={styles.form_card_cvc}>
                                <CssTextField
                                    {...register("cvc", {
                                        required: true,
                                    })}
                                    id='cvc'
                                    label='CVC'
                                    fullWidth
                                    error={false}
                                    value={cvc}
                                    placeholder='000'
                                    onChange={(e) => setCvc(e.target.value)}
                                    InputProps={{
                                        inputComponent: MaskedCvcNumber,
                                    }}
                                    inputProps={{ "data-testid": "cvc-field" }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.profile_card__info}>
                        <div className={styles.pre_info}>
                            <div className={styles.card_logo}>
                                <Logo className={styles.card_logo} />
                            </div>
                            <div className={styles.card__date}>{date}</div>
                        </div>
                        <div className={styles.card_number}>{number}</div>
                        <div className={styles.card__buttom_icons}>
                            <div className={styles.chip_icon}>
                                <Tech />
                            </div>
                            <div className={styles.tech_icon}>
                                <Ellipse className={styles.tech_icon_first} />
                                <Ellipse className={styles.tech_icon_second} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.submit__button}>
                    <button
                        className={styledButton}
                        type='submit'
                        data-testid='card-btn'
                    >
                        Coхранить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default connect(undefined, { setCard })(ProfileForm);
