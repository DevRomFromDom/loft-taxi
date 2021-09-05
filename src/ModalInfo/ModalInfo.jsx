import React, { useEffect, useState } from "react";
import styles from "./ModalInfo.module.scss";
import { connect } from "react-redux";
import classNames from "classnames";
import { PropTypes } from "prop-types";

const ModalInfo = ({ modalInfo, show }) => {
    const [close, setClose] = useState(false);
    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setClose(true);
            }, 3000);
        }
        return setClose(false);
    }, [show]);
    const { text, type } = modalInfo;
    const styledModal = classNames(styles.modal__container, {
        [styles.active]: show,
        [styles.close]: close,
        [styles.error]: type === "error",
        [styles.success]: type === "success",
    });

    return (
        <div className={styles.modal__wrapper}>
            <div className={styledModal} data-testid="modalInfo-container">
                <div className={styles.modal__text}>{text}</div>
            </div>
        </div>
    );
};

ModalInfo.propTypes = {
    modalInfo: PropTypes.object,
    show: PropTypes.bool,
};

export default connect((state) => ({
    modalInfo: state.modal.modalInfo,
    show: state.modal.show,
}))(ModalInfo);
