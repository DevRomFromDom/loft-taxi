import { GET_CARD, SET_CARD } from "../actions";

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
        case SET_CARD: {
            console.log(action.payload)
            return action.payload;
        }
        default:
            return state;
    }
}
