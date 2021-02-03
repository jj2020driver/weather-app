import { fetchChosenLocation } from "./chosenLocation.js";
import { fetchForecast } from "./forecast.js";

export function getUserLocationPending() {
    return {
        type: "GET_USER_LOCATION_PENDING"
    };
};

export function getUserLocationSuccess(data) {
    return {
        type: "GET_USER_LOCATION_SUCCESS",
        payload: data
    };
};

export function getUserLocationError(error) {
    return {
        type: "GET_USER_LOCATION_ERROR",
        error: error
    };
};

export function getUserLocation() {
    return async dispatch => {
        if (window.navigator.geolocation) {
            dispatch(getUserLocationPending());
            window.navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {

                (async () => {
                    const url = "http://api.openweathermap.org/data/2.5/weather";
                    const apiKey = "cfef6851883684acafd83bd9c8128de5";
                    try {
                        const response = await fetch(`${url}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
                        const json = await response.json();
                        dispatch(getUserLocationSuccess({ id: json.id }));

                        dispatch(fetchChosenLocation({ id: json.id }));
                        dispatch(fetchForecast({ id: json.id }));
                    } catch(e) {
                        dispatch(getUserLocationError(e));
                    }
                })();

            }, error => {
                dispatch(getUserLocationError(error));
            });
        } else {
            dispatch(getUserLocationError(new Error("Can't access the location")));
        }
    };
};


const initialState = {
    pending: false,
    data: null,
    error: null
}

export default function userLocationReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_USER_LOCATION_PENDING":
            return {
                ...state,
                pending: true
            };
        case "GET_USER_LOCATION_SUCCESS":
            return {
                ...state,
                pending: false,
                data: action.payload
            };
        case "GET_USER_LOCATION_ERROR":
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
}