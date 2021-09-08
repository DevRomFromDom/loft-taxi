import { REGISTRATION, showModalInfo, closeModalInfo } from "../actions";
import { serverRegistration } from "../../api";

export const regMiddleware = (store) => (next) => async (action) => {
    if (action.type === REGISTRATION) {
        const { email, password, name, surname } = action.payload;
        const data = await serverRegistration(email, password, name, surname);
        if (data.success) {
            localStorage.setItem("token", data.token);
            const state = store.getState();
            if (!state.modal.show) {
                store.dispatch(
                    showModalInfo({
                        text: "Регистрация прошла успешно! Необходимо авторизоваться.",
                        type: "success",
                    })
                );
                setTimeout(() => {
                    store.dispatch(closeModalInfo());
                }, 5000);
            }
            return data;
        } else {
            const state = store.getState();
            if (!state.modal.show) {
                store.dispatch(
                    showModalInfo({
                        text: "Ошибка авторизации, пользователь существует",
                        type: "error",
                    })
                );
                setTimeout(() => {
                    store.dispatch(closeModalInfo());
                }, 5000);
            }
        }
    } else {
        return next(action);
    }
};
