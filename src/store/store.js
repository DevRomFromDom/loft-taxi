import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware  from "redux-saga";
import rootSaga from "./saga/rootSaga";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
