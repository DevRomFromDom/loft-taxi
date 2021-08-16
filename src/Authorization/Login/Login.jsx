import React from "react";
import styles from "./Login.module.scss";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import classNames from "classnames";

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

const Login = ({ changeAuthStatus, changeEnterStatus }) => {
    const changeToRegistration = () => {
        changeAuthStatus("registration");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        changeEnterStatus("content");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const styledButton = classNames(styles.btn, { [styles.disabled]: email.length === 0 || password.length === 0 });
    
    return (
        <div className={styles.login__container}>
            <div className={styles.title}>Войти</div>
            <form
                className={styles.login__form}
                noValidate
                autoComplete='on'
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className={styles.email}>
                    <CssTextField
                        id='email'
                        data-testid='email-label'
                        label='Email'
                        required
                        fullWidth
                        error={false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.password}>
                    <CssTextField
                        data-testid='password-label'
                        id='password'
                        label='Пароль'
                        required
                        type='password'
                        fullWidth
                        error={false}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.forget_password}>Забыли пароль?</div>

                <button
                    className={styledButton}
                    type='submit'
                >
                    Войти
                </button>
            </form>
            <div className={styles.link}>
                Новый пользователь?
                <div
                    className={styles.link__login}
                    onClick={changeToRegistration}
                >
                    &nbsp; Регистрация
                </div>
            </div>
        </div>
    );
};

export default Login;
