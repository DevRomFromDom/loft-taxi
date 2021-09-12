import { takeEvery, call, put, delay } from "redux-saga/effects";
import { AUTHENTICATE, logIn, showModalInfo, closeModalInfo } from "../../actions";
import { serverLogin } from "../../../api";

export function* authenticateSaga(action) {
    const { email, password } = action.payload;
    const data = yield call(serverLogin, email, password);
   
    if (data.success) {
        yield put(logIn(data.token));
    }else{
        yield put(
            showModalInfo({
                text: `Неверный логин или пароль!`,
                type: "error",
            })
        );
        yield delay(4000);
        yield put(closeModalInfo());
    }
}

export function* authSaga() {
    yield takeEvery(AUTHENTICATE, authenticateSaga);
    
}
