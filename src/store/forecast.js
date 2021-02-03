export function fetchForecastPending() {
    return {
        type: "FETCH_FORECAST_PENDING"
    };
};

export function fetchForecastSuccess(data) {
    return {
        type: "FETCH_FORECAST_SUCCESS",
        payload: data
    };
};

export function fetchForecastError(error) {
    return {
        type: "FETCH_FORECAST_ERROR",
        error: error
    };
};

export function fetchForecast({ id }) {
    return async dispatch => {
        dispatch(fetchForecastPending());
        const url = "http://api.openweathermap.org/data/2.5/forecast";
        const apiKey = "cfef6851883684acafd83bd9c8128de5";
        try {
            const response = await fetch(`${url}?id=${id}&appid=${apiKey}&units=metric`);
            const json = await response.json();
            dispatch(fetchForecastSuccess(json));
        } catch(e) {
            dispatch(fetchForecastError(e));
        }
    };
};

const initialState = {
    pending: false,
    data: null,
    error: null
};

export default function forecastReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_FORECAST_PENDING":
            return {
                ...state,
                pending: true
            };
        case "FETCH_FORECAST_SUCCESS":
            return {
                ...state,
                pending: false,
                data: action.payload
            };
        case "FETCH_FORECAST_ERROR":
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default: 
            return state; 
    }
};