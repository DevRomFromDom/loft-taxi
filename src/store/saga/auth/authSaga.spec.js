import { recordSaga } from "../recordSaga";
import { authenticateSaga } from "./authSaga";
import { authenticate, LOG_IN, SHOW_MODAL_INFO } from "../../actions";
import { serverLogin } from "../../../api";

jest.mock("../../../api.js", () => ({
    serverLogin: jest.fn(() => ({ success: true, token: "123" })),
}));

describe("authSaga", () => {
    describe("#AUTHENTICATE", () => {
        it("authanticates through api", async () => {
            serverLogin.mockReturnValueOnce({ success: true, token: "123" });
            const dispatched = await recordSaga(
                authenticateSaga,
                authenticate("testLogin", "testpassword")
            );
            expect(dispatched).toEqual([{ type: LOG_IN, payload: "123" }]);
        });
        it("authanticates error message", async () => {
            serverLogin.mockReturnValueOnce({ success: false, token: "123" });
            const dispatched = await recordSaga(
                authenticateSaga,
                authenticate("testLogin", "testpassword")
            );
            expect(dispatched).toEqual([
                {
                    type: SHOW_MODAL_INFO,
                    payload: {
                        text: `Неверный логин или пароль!`,
                        type: "error",
                    },
                },
            ]);
        });
    });
});
