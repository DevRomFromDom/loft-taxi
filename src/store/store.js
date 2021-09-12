import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware  from "redux-saga";
import rootSaga from "./saga/rootSaga";
import rootReducer from "./reducers";
// import {
//     authMiddleware,
//     regMiddleware,
//     setCardMiddleware,
//     getCardMiddleware,
// } from "./middlewares";
// const middleWare = [
//     regMiddleware,
//     authMiddleware,

//     setCardMiddleware,
//     getCardMiddleware,
// ];

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
