import React, { useEffect, useState } from "react";
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

const Registration = ({ registraiton, regStatus }) => {
    const [regError, setRegError] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const StyledButton = classNames(styles.btn, {
        [styles.disabled]:
            name.length === 0 || email.length === 0 || password.length === 0 || regError === true
    });

    const history = useHistory();


   useEffect(()=>{
       if(regStatus === "error"){
           setRegError(true)
       }
       if(regStatus ==="success"){
        history.push("/auth/login")
       }
   },[regStatus, history])

    const handleSubmit = async (e) => {
        const [regName, regSurname] = name.trim().split(" ");
        e.preventDefault();
        await registraiton(email, password, regName, regSurname)

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
                        error={regError}
                        id='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setRegError(false);
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
                            setRegError(false);
                        }}
                        data-testid='name-label'
                        placeholder='Имя Фамилия'
                        type='text'
                        error={regError}
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
                        error={regError}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setRegError(false);
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
    regStatus: PropTypes.string
};

export default connect((state)=>({regStatus: state.modal.modalInfo.type}), { registraiton })(Registration);
