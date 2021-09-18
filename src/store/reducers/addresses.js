import { GET_ADDRESSES_STATE, SAVE_ROUTE } from "../actions";

const initialState = { addresses: [], route: [] };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ADDRESSES_STATE: {
            return { ...state, addresses: [...action.payload] };
        }
        case SAVE_ROUTE: {
            return { ...state, route: [...action.payload] };
        }
        default:
            return state;
    }
}
