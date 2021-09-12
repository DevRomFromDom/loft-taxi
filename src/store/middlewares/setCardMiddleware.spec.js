import { setCardMiddleware } from "./setCardMiddleware";
import { newCard } from "../actions.js";
import { serverSetCard } from "../../api.js";

jest.mock("../../api.js", () => ({
    serverSetCard: jest.fn(async () => ({ success: true })),
}));

describe("regMiddleware", () => {
    it("regMiddleware through api", async () => {
        serverSetCard.mockReturnValueOnce({ success: true });
        const dispatch = jest.fn();
        await setCardMiddleware({ dispatch })()(
            newCard({
                cardNumber: "2222 2222 2222 2222",
                expiryDate: "12/12",
                cardName: "221sdf",
                cvc: "222",
            })
        );

        expect(dispatch).toBeCalledWith({
            payload: {
                text: "Данные карты успешно добавлены.",
                type: "success",
            },
            type: "SHOW_MODAL_INFO",
        });
    });
});
