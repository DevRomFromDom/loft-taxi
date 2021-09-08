import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import {
    authMiddleware,
    regMiddleware,
    setCardMiddleware,
    getCardMiddleware,
} from "./middlewares";
const middleWare = [
    regMiddleware,
    authMiddleware,
    
    setCardMiddleware,
    getCardMiddleware,
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleWare))
);
