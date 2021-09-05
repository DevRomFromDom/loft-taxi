import React from "react";
import styles from "./App.module.scss";
import Authorization from "./Authorization";
import Content from "./Content";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import ModalInfo from "./ModalInfo";


const App = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <Switch>
                    <PrivateRoute path='/' exact />
                    <PrivateRoute path='/content' component={Content} />
                    <Route path='/auth' component={Authorization} />
                </Switch>
            </div>
            <ModalInfo />
        </>
    );
};

export default App;
