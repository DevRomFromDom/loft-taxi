import { takeEvery, call, put, delay } from "redux-saga/effects";
import { REGISTRATION, showModalInfo, closeModalInfo } from "../../actions";
import { serverRegistration } from "../../../api";
export function* registraitonSaga(action) {
    const { email, password, name, surname } = action.payload;
    const data = yield call(serverRegistration, email, password, name, surname);
    if (data.success) {
        yield put(
            showModalInfo({
                text: "Регистрация прошла успешно! Необходимо авторизоваться.",
                type: "success",
            })
        );
        yield delay(4000);
        yield put(closeModalInfo());
    } else {
        yield put(
            showModalInfo({
                text: "Ошибка авторизации, пользователь существует",
                type: "error",
            })
        );
        yield delay(4000);
        yield put(closeModalInfo());
    }
}

export function* regSaga() {
    yield takeEvery(REGISTRATION, registraitonSaga);
}
