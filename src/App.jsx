import React, { useState } from "react";
import styles from "./App.module.scss";
import Authorization from "./Authorization";
import Content from "./Content/Content";

function App() {
    const [enterStatus, setEnterStatus] = useState("auth");
    const changeEnterStatus=(e)=>{
        setEnterStatus(e)
    }
    return (
        <div className={styles.wrapper}>
            {enterStatus === "auth" ? <Authorization changeEnterStatus={changeEnterStatus}/> : <Content changeEnterStatus={changeEnterStatus} />}
        </div>
    );
}

export default App;
