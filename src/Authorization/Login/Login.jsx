import React from "react";
import styles from "./Login.module.scss";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { authenticate } from "../../store";
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

const Login = ({ authenticate }) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const styledButton = classNames(styles.btn, {
        [styles.disabled]: email.length === 0 || password.length === 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success = false } = (await authenticate(email, password)) ?? {};
        if (success) {
            console.log(success);
            history.push("/content/map");
        } else {
            setError(true);
        }
    };

    return (
        <div className={styles.login__container} data-testid='login-component'>
            <div className={styles.title}>Войти</div>
            <form
                className={styles.login__form}
                noValidate
                autoComplete='off'
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className={styles.email}>
                    <CssTextField
                        id='email'
                        data-testid='email-label'
                        label='Email'
                        required
                        fullWidth
                        error={error}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(false);
                        }}
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
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                        }}
                        error={error}
                    />
                </div>
                <div className={styles.forget_password}>Забыли пароль?</div>

                <button
                    className={styledButton}
                    type='submit'
                    data-testid='login-btn'
                >
                    Войти
                </button>
            </form>
            <div className={styles.link}>
                Новый пользователь?
                <Link
                    to='/auth/registration'
                    className={styles.link__reg}
                    data-testid='reg-link'
                >
                    &nbsp;Регистрация{" "}
                </Link>
            </div>
        </div>
    );
};

Login.propTypes = {
    authenticate: PropTypes.func,
};

export default connect(null, { authenticate })(Login);
