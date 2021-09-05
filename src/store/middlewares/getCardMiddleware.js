import { getCard } from "../actions";
import { serverGetCard } from "../../api";
import { GET_CARD_EMIT, showModalInfo, closeModalInfo } from "../actions";

export const getCardMiddleware = (store) => (next) => async (action) => {
    const state = store.getState();
    if (action.type === GET_CARD_EMIT) {
        const token = action.payload;
        const data = await serverGetCard(token);
        if (data.id) {
            localStorage.setItem("card", JSON.stringify(data));
            store.dispatch(getCard(data));
        } else{
            if (!state.modal.show) {
                store.dispatch(
                    showModalInfo({
                        text: `Данные карты, получить не удалось. ${data.error}`,
                        type: "error",
                    })
                );
                setTimeout(() => {
                    store.dispatch(closeModalInfo());
                }, 5000);
            }
        }
        return data;
    } else {
        next(action);
    }
};
