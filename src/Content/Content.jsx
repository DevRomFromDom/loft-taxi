import React, { useState } from "react";
import styles from "./Content.module.scss";
import Map from "./Map";
import Profile from "./Profile";
import { ReactComponent as Logo } from "../images/svg/logo.svg";
import classNames from "classnames";

const PAGES = {
    map: <Map />,
    profile: <Profile />,
};

const Content = ({ changeEnterStatus }) => {
    const [page, setPage] = useState("map");
    const handleChangePage = (e) => {
        e.preventDefault();
        setPage(e.target.value);
    };
    const exit = (e) => {
        e.preventDefault();
        changeEnterStatus("auth");
    };

    return (
        <div className={styles.content}>
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
                        className={classNames(styles.nav_btn, {
                            [styles.active]: page === "map",
                        })}
                        value={"map"}
                        onClick={(e) => {
                            handleChangePage(e);
                        }}
                    >
                        Карта
                    </button>
                    <button
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
                    <button className={styles.nav_btn} onClick={(e) => exit(e)}>
                        Выйти
                    </button>
                </nav>
            </div>
            <div className={styles.main_content__container}>{PAGES[page]}</div>
        </div>
    );
};

export default Content;
