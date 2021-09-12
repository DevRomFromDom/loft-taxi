import { recordSaga } from "../recordSaga";
import { getCurrentCardSaga } from "./getCardSaga";
import { serverGetCard } from "../../../api";
import { getCardEmit, GET_CARD, SHOW_MODAL_INFO } from "../../actions";

jest.mock("../../../api.js", () => ({
    serverGetCard: jest.fn(() => ({
        id: "12345",
        cardName: "name",
        cardNumber: "2222 2222 2222 2222",
        cvc: "123",
        expiryDate: "12/12",
    })),
}));

describe("getCardSaga", () => {
    describe("getCardSaga through api", () => {
        it("#GET_CARD_EMIT", async () => {
            serverGetCard.mockReturnValueOnce({
                id: "12345",
                cardName: "name",
                cardNumber: "2222 2222 2222 2222",
                cvc: "123",
                expiryDate: "12/12",
            });
            const dispatched = await recordSaga(
                getCurrentCardSaga,
                getCardEmit("123456")
            );
            expect(dispatched).toEqual([
                {
                    type: GET_CARD,
                    payload: {
                        id: "12345",
                        cardName: "name",
                        cardNumber: "2222 2222 2222 2222",
                        cvc: "123",
                        expiryDate: "12/12",
                    },
                },
            ]);
        });
        it("#GET_CARD_EMIT error", async () => {
            serverGetCard.mockReturnValueOnce({});
            const dispatched = await recordSaga(
                getCurrentCardSaga,
                getCardEmit("123456")
            );
            expect(dispatched).toEqual([
                {
                    type: SHOW_MODAL_INFO,
                    payload: {
                        text: `Для получения возможности заказывать такси, необоходимо заполнить данные карты.`,
                        type: "info",
                    },
                },
            ]);
        });
    });
});
