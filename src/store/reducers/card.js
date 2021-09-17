import { GET_CARD, NEW_CARD } from "../actions";

const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CARD: {
            if (initialState !== action.payload) {
                return action.payload;
            }
            return state;
        }
        case NEW_CARD: {
            const { cardName, cardNumber, cvc, expiryDate } = action.payload;
            return { ...state, cardName, cardNumber, cvc, expiryDate };
        }
        default:
            return state;
    }
}
