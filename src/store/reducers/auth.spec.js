import auth from "./auth";
import {LOG_IN, LOG_OUT} from "../actions";


describe("AUTH Reduser", ()=>{
    it("Any action call, return default state",()=>{
        expect(auth(undefined,{type:"ANY_ACTION"})).toEqual({isLoggedIn: false})
    });
    it("Log_in action run auth",()=>{
        expect(auth(undefined, {type:LOG_IN, payload: "token"})).toEqual({ isLoggedIn: true, token: "token" })
    });
    it("log_out action runs", ()=>{
        expect(auth({ isLoggedIn: true}, {type: LOG_OUT})).toEqual({isLoggedIn: false})
    })
})