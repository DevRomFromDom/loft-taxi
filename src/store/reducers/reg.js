import { REGISTRATION } from "../actions";

const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTRATION: {
            
            return action.payload;
        }
        default:
            return state;
    }
}
