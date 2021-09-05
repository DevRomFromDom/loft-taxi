export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const REGISTRATION = "REGISTRATION";
export const GET_CARD = "GET_CARD";
export const SET_CARD = "SET_CARD";
export const NEW_CARD = "NEW_CARD";
export const GET_CARD_EMIT = "GET_CARD_EMIT"
export const SHOW_MODAL_INFO = "SHOW_MODAL_INFO"
export const CLOSE_MODAL_INFO = "CLOSE_MODAL_INFO"

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

export const showModalInfo = (modalInfo)=>({type: SHOW_MODAL_INFO, payload: modalInfo})
export const closeModalInfo = ()=>({type: CLOSE_MODAL_INFO})


export const getCardEmit = (token) => ({type: GET_CARD_EMIT, payload: token})
export const getCard = (token) => ({ type: GET_CARD, payload: token });

export const setCard = ({ cardNumber, expiryDate, cardName, cvc, token }) => ({
    type: SET_CARD,
    payload: { cardNumber, expiryDate, cardName, cvc, token },
});
export const newCard = ({
    cardNumber,
    expiryDate: date,
    cardName: name,
    cvc,
    token,
}) => ({
    type: NEW_CARD,
    payload: {
        cardNumber: cardNumber,
        expiryDate: date,
        cardName: name,
        cvc: cvc,
        token: token,
    },
});
