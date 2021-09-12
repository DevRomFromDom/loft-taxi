import { regMiddleware } from "./regMiddleware";
import { registraiton } from "../actions.js";
import { serverRegistration } from "../../api.js";

jest.mock("../../api.js", () => ({
    serverRegistration: jest.fn(async () => ({ success: true })),
}));

describe("regMiddleware", () => {
    it("regMiddleware through api", async () => {
        serverRegistration.mockReturnValueOnce({ success: true });
        const dispatch = jest.fn();
        await regMiddleware({ dispatch})()(
            registraiton("email", "password", "name", "surname")
        );

        expect(dispatch).toBeCalledWith({
            payload: {
                text: "Регистрация прошла успешно! Необходимо авторизоваться.",
                type: "success",
            },
            type: "SHOW_MODAL_INFO",
        });
    });
});
