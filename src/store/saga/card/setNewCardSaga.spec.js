import { recordSaga } from "../recordSaga";
import { setCardSaga } from "./setNewCardSaga";
import { serverSetCard } from "../../../api";
import { setCard, NEW_CARD, SHOW_MODAL_INFO } from "../../actions";

jest.mock("../../../api.js", () => ({
    serverSetCard: jest.fn(() => ({ success: true })),
}));

describe("setCardSaga", () => {
    describe("setCardSaga through api", () => {
        it("#SET_CARD", async () => {
            serverSetCard.mockReturnValueOnce({
                success: true,
            });
            const dispatched = await recordSaga(
                setCardSaga,
                setCard({
                    cardNumber: "9999 9999 9999 9999",
                    expiryDate: "12/12",
                    cardName: "name",
                    cvc: "123",
                    token: "2325135fgdfg",
                })
            );
            expect(dispatched).toEqual([
                {
                    type: NEW_CARD,
                    payload: {
                        cardNumber: "9999 9999 9999 9999",
                        expiryDate: "12/12",
                        cardName: "name",
                        cvc: "123",
                    },
                },
                {
                    type: SHOW_MODAL_INFO,
                    payload: {
                        text: "Данные карты успешно добавлены!",
                        type: "success",
                    },
                },
            ]);
        });
        it("#SET_CARD_EMIT success", async () => {
            serverSetCard.mockReturnValueOnce({ success: true });
            const dispatched = await recordSaga(
                setCardSaga,
                setCard({
                    cardNumber: "9999 9999 9999 9999",
                    expiryDate: "12/12",
                    cardName: "name",
                    cvc: "123",
                    token: "2325135fgdfg",
                })
            );
            expect(dispatched).toEqual([
                {
                    type: NEW_CARD,
                    payload: {
                        cardNumber: "9999 9999 9999 9999",
                        expiryDate: "12/12",
                        cardName: "name",
                        cvc: "123",
                    },
                },
                {
                    type: SHOW_MODAL_INFO,
                    payload: {
                        text: "Данные карты успешно добавлены!",
                        type: "success",
                    },
                },
            ]);
        });

        it("#SET_CARD_EMIT error", async () => {
            serverSetCard.mockReturnValueOnce({ success: false });
            const dispatched = await recordSaga(
                setCardSaga,
                setCard({
                    cardNumber: "9999 9999 9999 9999",
                    expiryDate: "12/12",
                    cardName: "name",
                    cvc: "123",
                    token: "2325135fgdfg",
                })
            );
            expect(dispatched).toEqual([
                {
                    type: SHOW_MODAL_INFO,
                    payload: {
                        text: `Введены некорректные данные! Данные карты не обновлены!`,
                        type: "error",
                    },
                },
            ]);
        });
    });
});
