import React, { useEffect } from "react";
import styles from "./Registration.module.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registraiton } from "../../store";
import { Link, useHistory } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

const Registration = ({ regStatus }) => {
    const history = useHistory();

    useEffect(() => {
        if (regStatus === "success") {
            history.push("/auth/login");
        }
        return
    }, [regStatus, history]);

    return (
        <div
            className={styles.reg__container}
            data-testid='registration-component'
        >
            <div className={styles.title}>Регистрация</div>
            <RegistrationForm regStatus={regStatus} />
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
    regStatus: PropTypes.string,
};

export default connect((state) => ({ regStatus: state.modal.modalInfo.type }), {
    registraiton,
})(Registration);
