import React from "react";
import styles from "./App.module.scss";
import Authorization from "./Authorization";
import Content from "./Content/Content";
import { withAuth } from "./AuthContext";
import PropTypes from "prop-types";

const App = ({ isLoggedIn }) => {
    App.propTypes = {
        isLoggedIn: PropTypes.bool,
    };

    return (
        <div className={styles.wrapper}>
            {isLoggedIn ? <Content /> : <Authorization />}
        </div>
    );
};

export default withAuth(App);
