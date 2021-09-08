import { combineReducers } from "redux";
import auth from "./auth.js";

import card from "./card";
import modal from "./modal"

export default combineReducers({ auth, card, modal });
