import { registraitonSaga } from "./regSaga";
import { recordSaga } from "../recordSaga";
import { registraiton, SHOW_MODAL_INFO } from "../../actions";
import { serverRegistration } from "../../../api";

jest.mock("../../../api.js", () => ({
    serverRegistration: jest.fn(() => ({ success: true })),
}));

describe("registraion saga", () => {
    describe("#REGISTRATION", () => {
        it("registarion through api", async () => {
            serverRegistration.mockReturnValueOnce({ success: true });
            const dispatched = await recordSaga(
                registraitonSaga,
                registraiton(
                    "testemail",
                    "testname",
                    "testSurname",
                    "testpassword"
                )
            );
            expect(dispatched).toEqual([
                {
                    type: SHOW_MODAL_INFO,
                    payload: {
                        text: "Регистрация прошла успешно! Необходимо авторизоваться.",
                        type: "success",
                    },
                },
            ]);
        });
        it("registarion error message", async () => {
            serverRegistration.mockReturnValueOnce({ success: false });
            const dispatched = await recordSaga(
                registraitonSaga,
                registraiton(
                    "testemail",
                    "testname",
                    "testSurname",
                    "testpassword"
                )
            );
            expect(dispatched).toEqual([
                {
                    type: SHOW_MODAL_INFO,
                    payload: {
                        text: "Ошибка авторизации, пользователь существует",
                        type: "error",
                    },
                },
            ]);
        });
    });
});
