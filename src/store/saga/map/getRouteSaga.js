import { takeEvery, call, put,delay } from "redux-saga/effects";
import { saveRoute } from "../../actions";
import { getRouteFromServer } from "../../../api";
import { GET_ROUTE } from "../../actions";
import { showModalInfo,closeModalInfo } from "../../actions";
export function* getRouteSagaMiddleware(action) {
    const { address1, address2 } = action.payload;
    const data = yield call(getRouteFromServer, address1, address2);
    if (data.length > 0) {
        yield put(saveRoute(data));
    } else {
        yield put(
            showModalInfo({
                text: "В данный момент перевозки по данному маршруту заблокированы. Выберете другой маршрут.",
                type: "info",
            })
        );
        yield delay(4000);
        yield put(closeModalInfo());
    }
}

export function* getRouteSaga() {
    yield takeEvery(GET_ROUTE, getRouteSagaMiddleware);
}
