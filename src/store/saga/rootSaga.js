import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth/authSaga";
import { regSaga } from "./auth/regSaga";
import { getCardSaga } from "./card/getCardSaga";
import { setNewCardSaga } from "./card/setNewCardSaga";
import { getAddresses } from "./map/getAddressesSaga";
import { getRouteSaga } from "./map/getRouteSaga";

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(regSaga),
        fork(getCardSaga),
        fork(setNewCardSaga),
        fork(getAddresses),
        fork(getRouteSaga)
    ]);
}
