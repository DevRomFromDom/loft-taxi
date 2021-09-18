import { takeEvery, call, put, delay } from "redux-saga/effects";
import {
    GET_CARD_EMIT,
    showModalInfo,
    closeModalInfo,
    getCard,
} from "../../actions";
import { serverGetCard } from "../../../api";
export function* getCurrentCardSaga(action) {
    const token = action.payload;
    const data = yield call(serverGetCard, token);
    if (data.id) {
        yield put(getCard(data));
    
    } else {
        yield put(
            showModalInfo({
                text: `Для получения возможности заказывать такси, необоходимо заполнить данные карты.`,
                type: "info",
            })
        );
        yield delay(4000);
        yield put(closeModalInfo());
    }
}

export function* getCardSaga() {
    yield takeEvery(GET_CARD_EMIT, getCurrentCardSaga);
}
