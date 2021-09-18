export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const REGISTRATION = "REGISTRATION";
export const GET_CARD = "GET_CARD";
export const SET_CARD = "SET_CARD";
export const NEW_CARD = "NEW_CARD";
export const GET_CARD_EMIT = "GET_CARD_EMIT";
export const SHOW_MODAL_INFO = "SHOW_MODAL_INFO";
export const CLOSE_MODAL_INFO = "CLOSE_MODAL_INFO";
export const GET_ADDRESSES = "GET_ADDRESSES";
export const GET_ADDRESSES_STATE = "GET_ADDRESSES_STATE";
export const GET_ROUTE = "GET_ROUTE";
export const SAVE_ROUTE = "SAVE_ROUTE";

export const logIn = (token) => ({ type: LOG_IN, payload: token });
export const logOut = () => ({ type: LOG_OUT });
export const registraiton = (email, password, name, surname) => ({
    type: REGISTRATION,
    payload: { email, password, name, surname },
});
export const authenticate = (email, password) => ({
    type: AUTHENTICATE,
    payload: { email, password },
});

export const showModalInfo = (modalInfo) => ({
    type: SHOW_MODAL_INFO,
    payload: modalInfo,
});
export const closeModalInfo = () => ({ type: CLOSE_MODAL_INFO });

export const getCardEmit = (token) => ({ type: GET_CARD_EMIT, payload: token });
export const getCard = (data) => ({ type: GET_CARD, payload: data });

export const setCard = ({ cardNumber, expiryDate, cardName, cvc, token }) => ({
    type: SET_CARD,
    payload: { cardNumber, expiryDate, cardName, cvc, token },
});
export const newCard = ({ cardNumber, expiryDate, cardName, cvc }) => ({
    type: NEW_CARD,
    payload: {
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cardName: cardName,
        cvc: cvc
    },
});

export const getAddresses = () => ({ type: GET_ADDRESSES });
export const getAddressesState = (addresses) => ({
    type: GET_ADDRESSES_STATE,
    payload: addresses,
});
export const getRoute = (address1, address2) => ({
    type: GET_ROUTE,
    payload: { address1, address2 },
});
export const saveRoute = (addresses) => ({
    type: SAVE_ROUTE,
    payload: addresses,
});
