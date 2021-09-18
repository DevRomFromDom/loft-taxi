import { combineReducers } from "redux";
import auth from "./auth.js";

import card from "./card";
import modal from "./modal"
import addresses from "./addresses.js";

export default combineReducers({ auth, card, modal,addresses });
