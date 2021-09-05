import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Registration.module.scss";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registraiton } from "../../store";
import { Link, useHistory } from "react-router-dom";

const CssTextField = withStyles({
    root: {
        "& label": {
            fontWeight: "bold",
            fontSize: "16px",
            lineHeight: "19px",
        },
        "& label.Mui-focused": {
            color: "black",
        },
    },
})(TextField);

const Registration = ({ registraiton }) => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const StyledButton = classNames(styles.btn, {
        [styles.disabled]:
            name.length === 0 || email.length === 0 || password.length === 0,
    });

    const history = useHistory();

    const handleSubmit = async (e) => {
        const [regName, regSurname] = name.trim().split(" ");
        e.preventDefault();
        const {success = false} = (await registraiton(email, password, regName, regSurname))??{};
        console.log(success);
        if (success) {
            history.push("/auth/login");
        } else {
            setError(true);
        }
    };
    return (
        <div
            className={styles.reg__container}
            data-testid='registration-component'
        >
            <div className={styles.title}>Регистрация</div>
            <form
                className={styles.login__form}
                noValidate
                autoComplete='off'
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className={styles.email}>
                    <CssTextField
                        label='Email'
                        required
                        fullWidth
                        error={error}
                        id='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(false);
                        }}
                        data-testid='email-label'
                        type='email'
                        name='registration'
                    />
                </div>
                <div className={styles.name}>
                    <CssTextField
                        label='Как вас зовут?'
                        required
                        fullWidth
                        id='name'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError(false);
                        }}
                        data-testid='name-label'
                        placeholder='Имя Фамилия'
                        type='text'
                        error={error}
                    />
                </div>
                <div className={styles.password}>
                    <CssTextField
                        data-testid='password-label'
                        id='password'
                        label='Придумайте пароль'
                        required
                        type='password'
                        fullWidth
                        error={error}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                        }}
                    />
                </div>

                <button className={StyledButton} type='submit'>
                    Зарегистрироваться
                </button>
            </form>
            <div className={styles.link}>
                Уже зарегестрированны?{" "}
                <Link
                    to='/auth/login'
                    className={styles.link__login}
                    data-testid='login-link'
                >
                    &nbsp;Войти?{" "}
                </Link>
            </div>
        </div>
    );
};

Registration.propTypes = {
    registraiton: PropTypes.func,
};

export default connect(null, { registraiton })(Registration);
