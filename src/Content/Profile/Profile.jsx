import React from "react";
import styles from "./Profile.module.scss";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { ReactComponent as Logo } from "../../images/svg/logo.svg";
import { ReactComponent as Tech } from "../../images/svg/Tech.svg";
import { ReactComponent as Ellipse } from "../../images/svg/Ellipse.svg";
import { MaskedCardNumber, MaskedDateNumber, MaskedCvcNumber } from "./masks";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { newCard, getCardEmit } from "../../store";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";

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

const Profile = ({ token }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [date, setDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [edit, setEdit] = useState(true);

    const history = useHistory();
    useEffect(() => {
        dispatch(getCardEmit(token));
    }, [dispatch, token]);

    const styledButton = classNames(styles.save_btn, {
        [styles.disabled]:
            name.length === 0 ||
            cardNumber.length !== 19 ||
            cvc.length !== 3 ||
            date.length !== 5,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(
            newCard({
                cardNumber: cardNumber,
                expiryDate: date,
                cardName: name,
                cvc: cvc,
                token: token,
            })
        );
        setEdit(false);
    };

    if (edit) {
        return (
            <div className={styles.profile__component}>
                <div className={styles.profile__content}>
                    <div className={styles.profile__form}>
                        <div className={styles.profile_title__container}>
                            <div className={styles.profile_title}>Профиль</div>
                            <div className={styles.profile_sub_title}>
                                Ввдеите платежные данные
                            </div>
                        </div>
                        <div className={styles.profile__main_form}>
                            <form
                                onSubmit={(e) => handleSubmit(e)}
                                className={styles.form_body}
                            >
                                <div className={styles.form_container_main}>
                                    <div
                                        className={
                                            styles.profile_form__container
                                        }
                                    >
                                        <div className={styles.form_input}>
                                            <CssTextField
                                                id='name'
                                                data-testid='name-field'
                                                label='Имя пользвователя'
                                                fullWidth
                                                error={false}
                                                placeholder='Введите имя'
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className={styles.form_input}>
                                            <CssTextField
                                                id='number'
                                                data-testid='number-field'
                                                label='Номер карты'
                                                placeholder='0000 0000 0000 0000'
                                                fullWidth
                                                error={false}
                                                value={cardNumber}
                                                onChange={(e) =>
                                                    setCardNumber(
                                                        e.target.value
                                                    )
                                                }
                                                InputProps={{
                                                    inputComponent:
                                                        MaskedCardNumber,
                                                }}
                                            />
                                        </div>
                                        <div className={styles.form_card__info}>
                                            <div
                                                className={
                                                    styles.form_card_date
                                                }
                                            >
                                                <CssTextField
                                                    id='form-date'
                                                    data-testid='form-date-field'
                                                    label='MM/YY'
                                                    fullWidth
                                                    placeholder='00/00'
                                                    error={false}
                                                    value={date}
                                                    onChange={(e) =>
                                                        setDate(e.target.value)
                                                    }
                                                    InputProps={{
                                                        inputComponent:
                                                            MaskedDateNumber,
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={styles.form_card_cvc}
                                            >
                                                <CssTextField
                                                    id='cvc'
                                                    data-testid='cvc-field'
                                                    label='CVC'
                                                    fullWidth
                                                    error={false}
                                                    value={cvc}
                                                    placeholder='000'
                                                    onChange={(e) =>
                                                        setCvc(e.target.value)
                                                    }
                                                    InputProps={{
                                                        inputComponent:
                                                            MaskedCvcNumber,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.profile_card__info}>
                                        <div className={styles.pre_info}>
                                            <div className={styles.card_logo}>
                                                <Logo
                                                    className={styles.card_logo}
                                                />
                                            </div>
                                            <div className={styles.card__date}>
                                                {date}
                                            </div>
                                        </div>
                                        <div className={styles.card_number}>
                                            {cardNumber}
                                        </div>
                                        <div
                                            className={
                                                styles.card__buttom_icons
                                            }
                                        >
                                            <div className={styles.chip_icon}>
                                                <Tech />
                                            </div>
                                            <div className={styles.tech_icon}>
                                                <Ellipse
                                                    className={
                                                        styles.tech_icon_first
                                                    }
                                                />
                                                <Ellipse
                                                    className={
                                                        styles.tech_icon_second
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.submit__button}>
                                    <button
                                        className={styledButton}
                                        type='submit'
                                    >
                                        Coхранить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.profile__component}>
                <div className={styles.profile__content}>
                    <div className={styles.profile__form}>
                        <div className={styles.profile_title__container}>
                            <div className={styles.profile_title}>Профиль</div>
                            <div className={styles.profile_sub_title}>
                                Платёжные данные обновлены. Теперь вы можете
                                заказывать такси.
                            </div>
                        </div>
                        <div className={styles.submit__button}>
                            <button
                                className={styles.save_btn}
                                onClick={() => history.push("/content/map")}
                            >
                                Перейти на карту
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect((state) => ({ token: state.auth.token }), {
    newCard,
    getCardEmit,
})(Profile);
