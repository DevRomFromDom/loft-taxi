import { SHOW_MODAL_INFO, CLOSE_MODAL_INFO } from "../actions";

const initialState = {
    modalInfo: { text: "", type: "" },
    show: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL_INFO: {
            return { modalInfo: action.payload, show: true };
        }
        case CLOSE_MODAL_INFO: {
            return {
                modalInfo: { text: "", type: "" },
                show: false,
            };
        }
        default:
            return state;
    }
}
