import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import styles from "./RegistrationForm.module.scss";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { connect } from "react-redux";
import { registraiton, showModalInfo, closeModalInfo } from "../../../store";

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

const RegistrationForm = ({
    registraiton,
    showModalInfo,
    closeModalInfo,
    regStatus,
}) => {
    const [regError, setRegError] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        if (regStatus === "error") {
            setRegError(true);
        }
        return
    }, [regStatus]);

    const handleRegister = async (data) => {
        const [regName, regSurName] = data.name.trim().split(" ");
        if (!regSurName) {
            setRegError(true);
            showModalInfo({
                text: "Необходимо указать имя и фамилию",
                type: "error",
            });
            setTimeout(() => {
                closeModalInfo();
            }, 4000);
        } else {
            const body = {
                email: data.registration,
                name: regName,
                surname: regSurName,
                password: password,
            };
            await registraiton(
                body.email,
                body.name,
                body.surname,
                body.password
            );
        }
    };

    const StyledButton = classNames(styles.btn, {
        [styles.disabled]: !name || !email || !password || regError === true,
    });

    return (
        <form
            className={styles.login__form}
            onSubmit={handleSubmit(handleRegister)}
        >
            <div className={styles.email}>
                <CssTextField
                    {...register("registration", { required: true })}
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
                    type='email'
                    name='registration'
                    inputProps={{ "data-testid": "email-label" }}
                />
            </div>
            <div className={styles.name}>
                <CssTextField
                    {...register("name", { required: true })}
                    label='Как вас зовут?'
                    required
                    fullWidth
                    id='name'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setRegError(false);
                    }}
                    placeholder='Имя Фамилия'
                    type='text'
                    error={regError}
                    inputProps={{ "data-testid": "name-label" }}
                />
            </div>
            <div className={styles.password}>
                <CssTextField
                    {...register("password", { required: true })}
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
                    inputProps={{ "data-testid": "password-label" }}
                />
            </div>

            <button
                className={StyledButton}
                type='submit'
                data-testid='reg-btn'
            >
                Зарегистрироваться
            </button>
        </form>
    );
};

export default connect(undefined, {
    registraiton,
    showModalInfo,
    closeModalInfo,
})(RegistrationForm);
