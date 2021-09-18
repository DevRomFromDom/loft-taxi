import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import styles from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { connect } from "react-redux";
import { authenticate } from "../../../store";

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

const LoginForm = ({ authenticate, regStatus }) => {
    const [res, setRes] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        if (regStatus.type === "error") {
            setError(true);
        }
    }, [regStatus]);
    useEffect(() => {
        if (regStatus) {
            setRes(false);
        }
    }, [regStatus]);

    const formSubmit = async (data) => {
        await setRes(true);
        const { email, password } = data;
        await  authenticate(email, password);
        
    };
    const styledButton = classNames(styles.btn, {
        [styles.disabled]: email.length === 0 || password.length === 0 || res,
    });

    return (
        <div className={styles.login__form_wrapper}>
            <form
                className={styles.login__form}
                onSubmit={handleSubmit(formSubmit)}
            >
                <div className={styles.email}>
                    <CssTextField
                        {...register("email", { required: true })}
                        id='email'
                        name='email'
                        label='Email'
                        required
                        fullWidth
                        error={error}
                        value={email}
                        inputProps={{ "data-testid": "email-label" }}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(false);
                        }}
                        autoFocus
                    />
                </div>
                <div className={styles.password}>
                    <CssTextField
                        id='password'
                        name='password'
                        label='Пароль'
                        required
                        type='password'
                        fullWidth
                        value={password}
                        {...register("password", { required: true })}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                        }}
                        error={error}
                        inputProps={{ "data-testid": "password-label" }}
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
        </div>
    );
};

export default connect(undefined, { authenticate })(LoginForm);
