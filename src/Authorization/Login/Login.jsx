import React, { useEffect } from "react";
import styles from "./Login.module.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = ({ isLoggedIn, statusMessage }) => {
    const history = useHistory();
    useEffect(() => {
        if (isLoggedIn) {
            history.push("/content/map");
        }
    }, [isLoggedIn, history]);

    return (
        <div className={styles.login__container} data-testid='login-component'>
            <div className={styles.title}>Войти</div>
            <LoginForm regStatus={statusMessage} />
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
    isLoggedIn: PropTypes.bool,
};

export default connect((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    statusMessage: state.modal.modalInfo,
}))(Login);
