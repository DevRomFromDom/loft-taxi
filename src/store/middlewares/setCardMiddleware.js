import { setCard, showModalInfo, closeModalInfo, NEW_CARD } from "../actions";
import { serverSetCard } from "../../api";

export const setCardMiddleware = (store) => (next) => async (action) => {
    if (action.type === NEW_CARD) {
        const { cardNumber, expiryDate, cardName, cvc, token } = action.payload;
        const data = await serverSetCard({
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cardName: cardName,
            cvc: cvc,
            token: token,
        });
        if (data.success) {
            localStorage.setItem("card", JSON.stringify(action.payload));
            store.dispatch(
                setCard({ cardNumber, expiryDate, cardName, cvc, token })
            );
            store.dispatch(
                showModalInfo({
                    text: "Данные карты успешно добавлены.",
                    type: "success",
                })
            );
            setTimeout(() => {
                store.dispatch(closeModalInfo());
            }, 5000);
        } else {
            store.dispatch(
                showModalInfo({
                    text: data.error,
                    type: "error",
                })
            );
            setTimeout(() => {
                store.dispatch(closeModalInfo());
            }, 5000);
        }
    } else {
        return next(action);
    }
};
