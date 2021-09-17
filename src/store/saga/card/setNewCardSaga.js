import { takeEvery, call, put, delay } from "redux-saga/effects";
import {
    SET_CARD,
    showModalInfo,
    closeModalInfo,
    newCard,
} from "../../actions";
import { serverSetCard } from "../../../api";
export function* setCardSaga(action) {
    const { cardNumber, expiryDate, cardName, cvc, token } = action.payload;
    const data = yield call(
        serverSetCard,
        cardNumber,
        expiryDate,
        cardName,
        cvc,
        token
    );
    if (data.success) {
        yield put(newCard({ cardNumber, expiryDate, cardName, cvc }));
        yield put(
            showModalInfo({
                text: "Данные карты успешно добавлены!",
                type: "success",
            })
        );
        yield delay(4000);
        yield put(closeModalInfo());
    } else {
        yield put(
            showModalInfo({
                text: "Введены некорректные данные! Данные карты не обновлены!",
                type: "error",
            })
        );
        yield delay(4000);
        yield put(closeModalInfo());
    }
}

export function* setNewCardSaga() {
    yield takeEvery(SET_CARD, setCardSaga);
}
