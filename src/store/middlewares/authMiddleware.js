import { logIn, showModalInfo, closeModalInfo } from "../actions";
import { serverLogin } from "../../api";
import { AUTHENTICATE } from "../actions";

export const authMiddleware = (store) => (next) => async (action) => {
    if (action.type === AUTHENTICATE) {
        const { email, password } = action.payload;
        const data = await serverLogin(email, password);
        if (data.success) {
            const token =  await localStorage.getItem("token")
            if (!(token) || data.token !== token) {
                localStorage.setItem("token", data.token);
            }
            store.dispatch(logIn(data.token));
            return data;
        } else{
            const state = store.getState();
            if (!state.modal.show) {
                store.dispatch(
                    showModalInfo({
                        text: `Указан неверный Email или пароль! ${data.error}`,
                        type: "error",
                    })
                );
                setTimeout(() => {
                    store.dispatch(closeModalInfo());
                }, 5000);
            }
        }
    } else {
        next(action);
    }
};
