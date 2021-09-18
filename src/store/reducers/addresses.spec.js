import addresses from "./addresses";
import { GET_ADDRESSES_STATE, SAVE_ROUTE } from "../actions";

describe("AUTH Reduser", () => {
    it("Any action call, return default state", () => {
        expect(addresses(undefined, { type: "ANY_ACTION" })).toEqual({
            addresses: [],
            route: [],
        });
    });
    it("Log_in action run auth", () => {
        expect(
            addresses(undefined, {
                type: GET_ADDRESSES_STATE,
                payload: ["sss"],
            })
        ).toEqual({ addresses: ["sss"], route:[] });
    });
    it("log_out action runs", () => {
        expect(
            addresses(undefined, { type: SAVE_ROUTE, payload: ["123", "123"] })
        ).toEqual({
            addresses: [],
            route: ["123", "123"],
        });
    });
});
