import { combineReducers } from "redux";
import auth from "./auth.js";
import reg from "./reg";
import card from "./card";
import modal from "./modalInfo"

export default combineReducers({ auth, reg, card, modal });
