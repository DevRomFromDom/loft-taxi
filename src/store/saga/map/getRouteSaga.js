import { takeEvery, call, put } from "redux-saga/effects";
import { saveRoute } from "../../actions";
import { getRouteFromServer } from "../../../api";
import { GET_ROUTE } from "../../actions";
export function* getRouteSagaMiddleware(action) {
    const { address1, address2 } = action.payload;
    const data = yield call(getRouteFromServer, address1, address2);
    if (data) {
        yield put(saveRoute(data));
    }
}

export function* getRouteSaga() {
    yield takeEvery(GET_ROUTE, getRouteSagaMiddleware);
}
