import React from "react";
import styles from "./Content.module.scss";
import Map from "./Map";
import Profile from "./Profile";
import { ReactComponent as Logo } from "../images/svg/logo.svg";
import classNames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../store";
import { Link, Switch, Route } from "react-router-dom";


const Content = ({ logOut, match }) => {
   

    return (
        <div className={styles.content} data-testid='content-container'>
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
                    <Link
                        to={`${match.url+'/map'}`}
                        data-testid='navigator-button'
                        className={classNames(styles.nav_btn, {
                            [styles.active]: match === "map",
                        })}
                    >
                        Карта
                    </Link>
                    <Link
                        data-testid='profile-button'
                        className={classNames(styles.nav_btn, {
                            [styles.active]: match === "profile",
                        })}
                        to={`${match.url+'/profile'}`}
                    >
                        Профиль
                    </Link>
                    <button className={styles.nav_btn} onClick={() => logOut()}>
                        Выйти
                    </button>
                </nav>
            </div>
            <div className={styles.main_content__container}>
                <Switch>
                    <Route  path={`${match.url+"/map"}`} component={Map} />
                    <Route  path={`${match.url+"/profile"}`} component={Profile} />
                </Switch>
            </div>
        </div>
    );
};

Content.propTypes = {
    logOut: PropTypes.func,
    match: PropTypes.object
};

export default connect(null, {
    logOut,
})(Content);
