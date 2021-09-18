import card from "./card";
import { GET_CARD, SET_CARD } from "../actions";

const fakeCard = {
    id: "rec4NwqbXyWY2Ju7E",
    cardNumber: "4",
    expiryDate: "12121",
    cardName: "qw",
    cvc: "223",
};
describe("Card reducer", () => {
    it("Card reduecer return default state", () => {
        expect(card(undefined, { type: "UNKNOWN_ACTION" })).toEqual({});
    });
    describe("GET_CARD action", () => {
        it("GET_CARD with new action payload", () => {
            expect(
                card(fakeCard, {
                    type: GET_CARD,
                    payload: {
                        id: "rec4NwqbXyWY2Ju7E",
                        cardNumber: "43",
                        expiryDate: "12121",
                        cardName: "qw",
                        cvc: "223",
                    },
                })
            ).toEqual({
                id: "rec4NwqbXyWY2Ju7E",
                cardNumber: "43",
                expiryDate: "12121",
                cardName: "qw",
                cvc: "223",
            });
        });
        it("GET_CARD when state equal payload", () => {
            expect(
                card(fakeCard, {
                    type: GET_CARD,
                    payload: {
                        id: "rec4NwqbXyWY2Ju7E",
                        cardNumber: "4",
                        expiryDate: "12121",
                        cardName: "qw",
                        cvc: "223",
                    },
                })
            ).toEqual(fakeCard);
        });
    });
    it("NEW_CARD action", () => {
        expect(
            card(fakeCard, {
                type: SET_CARD,
                payload: {
                    cardNumber: "4",
                    expiryDate: "12121",
                    cardName: "qw",
                    cvc: "223",
                    token: "rec4NwqbXyWY2Ju7E"
                },
            })
        ).toEqual({
            cardNumber: "4",
            expiryDate: "12121",
            cardName: "qw",
            cvc: "223",
            id: "rec4NwqbXyWY2Ju7E"
        });
    });
});
