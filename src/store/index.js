import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// reducers
import chosenLocationReducer from "./chosenLocation.js";
import forecastReducer from "./forecast.js";
import userLocationReducer from "./userLocation.js"

const rootReducer = combineReducers({
    chosenLocation: chosenLocationReducer,
    forecast: forecastReducer,
    userLocation: userLocationReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;