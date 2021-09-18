import { recordSaga } from "../recordSaga";
import { getRouteSagaMiddleware } from "./getRouteSaga";
import { getRouteFromServer } from "../../../api";
import { getRoute, SAVE_ROUTE } from "../../actions";

jest.mock("../../../api.js", () => ({
    getRouteFromServer: jest.fn(() => [["21"], ["23"]]),
}));

describe("getRoute", () => {
    describe("getRoute through api", () => {
        it("#GET_ROUTE", async () => {
            getRouteFromServer.mockReturnValueOnce([["21"], ["23"]]);
            const dispatched = await recordSaga(
                getRouteSagaMiddleware,
                getRoute([["21"], ["23"]])
            );
            expect(dispatched).toEqual([
                {
                    type: SAVE_ROUTE,
                    payload: [["21"], ["23"]],
                },
            ]);
        });
    });
});
