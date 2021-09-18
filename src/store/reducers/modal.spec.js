import modal from "./modal";
import { SHOW_MODAL_INFO, CLOSE_MODAL_INFO } from "../actions";

const initialState = { modalInfo: { text: "", type: "" }, show: false };
describe("ModalInfo reducer", () => {
    it("ModalInfo don`t show", () => {
        expect(modal(undefined, { type: "UNKNOWN_ACTION" })).toEqual(
            initialState
        );
    });
    it("modalInfo show success message", () => {
        expect(
            modal(undefined, {
                type: SHOW_MODAL_INFO,
                payload: { text: "Удачный результат", type: "success" },
            })
        ).toEqual({
            modalInfo: { text: "Удачный результат", type: "success" },
            show: true,
        });
    });
    it("modalInfo close", () => {
        expect(
            modal(undefined, {
                type: CLOSE_MODAL_INFO,
            })
        ).toEqual(initialState);
    });
});
