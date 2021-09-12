import { authMiddleware } from "./authMiddleware";
import { authenticate } from "../actions";
import { serverLogin } from "../../api";

jest.mock("../../api.js", () => ({
    serverLogin: jest.fn(async () => {
        return { success: true, token: "123" };
    }),
}));

describe("authMiddleware", () => {
    describe("AUTHENTICATE", () => {
        it("authenticate through api", async () => {
            serverLogin.mockReturnValueOnce({ success: true, token: '123' });
            const dispatch = jest.fn();
            await authMiddleware({ dispatch })()(
                authenticate("test@test.com", "123123")
            );
            expect(serverLogin).toBeCalledWith("test@test.com", "123123");
            expect(dispatch).toBeCalledWith({
                type: "LOG_IN",
                payload: "123",
            });
            expect(dispatch).toBeCalledTimes(1);
        });
    });
});
