import React, { useState } from "react";
import styles from "./Content.module.scss";
import Map from "./Map";
import Profile from "./Profile";
import { ReactComponent as Logo } from "../images/svg/logo.svg";
import classNames from "classnames";
import { withAuth } from "../AuthContext";
import Navigator from "./Navigator";
import PropTypes from "prop-types";

const PAGES = {
    navigator: <Navigator />,
    profile: <Profile />,
};

const Content = ({ logOut }) => {
    Content.propTypes = {
        logOut: PropTypes.func,
    };

    const [page, setPage] = useState("navigator");
    const handleChangePage = (e) => {
        e.preventDefault();
        setPage(e.target.value);
    };

    return (
        <div className={styles.content} data-testid="content-container">
            <div className={styles.header}>
                <div className={styles.logo}>
                    <div className={styles.logo_svg}>
                        <Logo width='100%' height='100%' />
                    </div>
                    <div className={styles.logo__title}>
                        <span className={styles.text_white}>loft</span>
                        <span className={styles.text_black}>taxi</span>
                    </div>
                </div>
                <nav className={styles.nav}>
                    <button 
                        data-testid="navigator-button"
                        className={classNames(styles.nav_btn, {
                            [styles.active]: page === "navigator",
                        })}
                        value={"navigator"}
                        onClick={(e) => {
                            handleChangePage(e);
                        }}
                    >
                        Карта
                    </button>
                    <button
                        data-testid="profile-button"
                        className={classNames(styles.nav_btn, {
                            [styles.active]: page === "profile",
                        })}
                        value={"profile"}
                        onClick={(e) => {
                            handleChangePage(e);
                        }}
                    >
                        Профиль
                    </button>
                    <button className={styles.nav_btn} onClick={() => logOut()}>
                        Выйти
                    </button>
                </nav>
            </div>
            <div className={styles.main_content__container}>
                {PAGES[page]}
                <Map />
            </div>
        </div>
    );
};

export default withAuth(Content);
