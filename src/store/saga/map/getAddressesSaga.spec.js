import { recordSaga } from "../recordSaga";
import { getAddressesSaga } from "./getAddressesSaga";
import { getAddressesFromServer } from "../../../api";
import { getAddresses, GET_ADDRESSES_STATE } from "../../actions";

jest.mock("../../../api.js", () => ({
    getAddressesFromServer: jest.fn(() => ({
        addresses: ["Адрес 1", "Адрес 2"],
    })),
}));

describe("getAddresses", () => {
    describe("getAddresses through api", () => {
        it("#GET_ADDRESSES", async () => {
            getAddressesFromServer.mockReturnValueOnce({
                addresses: ["Адрес 1", "Адрес 2"],
            });
            const dispatched = await recordSaga(
                getAddressesSaga,
                getAddresses()
            );
            expect(dispatched).toEqual([{
                type: GET_ADDRESSES_STATE,
                payload: ["Адрес 1", "Адрес 2"],
            }]);
        });
    });
});
