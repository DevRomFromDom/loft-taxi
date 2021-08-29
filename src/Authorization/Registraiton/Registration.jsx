import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Registration.module.scss";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import PropTypes from "prop-types";

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

const Registration = ({ changeAuthStatus }) => {
    Registration.propTypes = {
        changeAuthStatus: PropTypes.string,
        logIn: PropTypes.func
    };
    const authContext = useContext(AuthContext);
    const changeToLogin = () => {
        changeAuthStatus("login");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        authContext.logIn(email, password);
    };
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const StyledButton = classNames(styles.btn, {
        [styles.disabled]:
            name.length === 0 || email.length === 0 || password.length === 0,
    });
    return (
        <div className={styles.reg__container} data-testid="registration-component">
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
                        error={false}
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        data-testid='email-label'
                    />
                </div>
                <div className={styles.name}>
                    <CssTextField
                        label='Как вас зовут?'
                        required
                        fullWidth
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        data-testid='name-label'
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
                        error={false}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className={StyledButton} type='submit'>
                    Зарегистрироваться
                </button>
            </form>
            <div className={styles.link}>
                Уже зарегестрированны?{" "}
                <div className={styles.link__login} onClick={changeToLogin} data-testid="login-link">
                    &nbsp; Войти?
                </div>
            </div>
        </div>
    );
};

export default Registration;
