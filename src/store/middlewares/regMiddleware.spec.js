import { regMiddleware } from "./regMiddleware";
import { registraiton } from "../actions.js";
import { serverRegistration } from "../../api.js";

jest.mock("../../api.js", ()=>({
    serverRegistration: jest.fn(async()=>({success:true}))
}))

describe("regMiddleware", () => {
    it("regMiddleware through api", async () => {
        const dispatch = jest.fn();
        await regMiddleware({ dispatch })()(
            registraiton("email", "password", "name", "surname")
        );

        expect(dispatch).toBeCalledTimes(2);
    });
    
});
