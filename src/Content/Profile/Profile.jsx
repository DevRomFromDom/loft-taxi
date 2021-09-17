import React from "react";
import styles from "./Profile.module.scss";
import { useState } from "react";
import { connect} from "react-redux";
import PropTypes from "prop-types";
import ProfileForm from "./ProfileForm";
import { useHistory } from "react-router-dom";

const Profile = ({ token, card }) => {
    const [edit, setEdit] = useState(true);
    const history = useHistory();
    if (edit) {
        return (
            <div className={styles.profile__component}>
                <div className={styles.profile__content}>
                    <div className={styles.profile__form}>
                        <div className={styles.profile_title__container}>
                            <div className={styles.profile_title}>Профиль</div>
                            <div className={styles.profile_sub_title}>
                                Ввдеите платежные данные
                            </div>
                        </div>
                        <ProfileForm
                            className={styles.profile__main_form}
                            card={card}
                            token={token}
                            closeForm={setEdit}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.profile__component}>
                <div className={styles.profile__content}>
                    <div className={styles.profile__form}>
                        <div className={styles.profile_title__container}>
                            <div className={styles.profile_title}>Профиль</div>
                            <div className={styles.profile_sub_title}>
                                Платёжные данные обновлены. Теперь вы можете
                                заказывать такси.
                            </div>
                        </div>
                        <div className={styles.submit__button}>
                            <button
                                className={styles.save_btn}
                                onClick={() => history.push("/content/map")}
                            >
                                Перейти на карту
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

Profile.propTypes = {
    token: PropTypes.string,
    card: PropTypes.object,
};

export default connect(
    (state) => ({ token: state.auth.token, card: state.card })
)(Profile);
