import React, { useState } from "react";
import Registration from "./Registraiton";
import Login from "./Login";
import styles from "./Authorization.module.scss";
import { ReactComponent as Logo } from "../images/svg/logo.svg";

const Authorization = ({changeEnterStatus}) => {
    const [authStarus, setAuthStarus] = useState("login");
    const changeAuthStatus = (e)=>{ 
        setAuthStarus(e)
    }
    return (
        <>
            <div className={styles.authbody}>
                <div className={styles.logo__container}>
                    <div className={styles.logo__content}>
                        <div className={styles.logo_svg}>
                            <Logo />
                        </div>
                        <div className={styles.logo__title}>
                            <span className={styles.text_white}>loft</span>
                            <span className={styles.text_black}>taxi</span>
                        </div>
                    </div>
                </div>
                <div className={styles.auth__body}>
                    <div className={styles.auth__container}>
                        {authStarus === "login" ? (
                            <Login changeAuthStatus={changeAuthStatus} changeEnterStatus={changeEnterStatus}/>
                        ) : authStarus === "registration" ? (
                            <Registration changeAuthStatus={changeAuthStatus} changeEnterStatus={changeEnterStatus}/>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Authorization;
