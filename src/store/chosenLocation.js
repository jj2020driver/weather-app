export function fetchChosenLocationPending() {
    return {
        type: "FETCH_CHOSEN_LOCATION_PENDING"
    };
};

export function fetchChosenLocationSuccess(location) {
    return {
        type: "FETCH_CHOSEN_LOCATION_SUCCESS",
        payload: location
    };
};

export function fetchChosenLocationError(error) {
    return {
        type: "FETCH_CHOSEN_LOCATION_ERROR",
        error: error
    };
};

export function fetchChosenLocation({ id }) {
    return async dispatch => {
        dispatch(fetchChosenLocationPending());
        const url = "https://api.openweathermap.org/data/2.5/weather";
        const apiKey = "cfef6851883684acafd83bd9c8128de5";
        try {
            const response = await fetch(`${url}?id=${id}&appid=${apiKey}&units=metric`);
            const json = await response.json();
            dispatch(fetchChosenLocationSuccess(json));
        } catch(e) {
            dispatch(fetchChosenLocationError(e));
        }
    }
};

const initialState = {
    pending: false,
    data: null,
    error: null
};

export default function chosenLocationReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_CHOSEN_LOCATION_PENDING":
            return {
                ...state,
                pending: true
            };
        case "FETCH_CHOSEN_LOCATION_SUCCESS": 
            return {
                ...state,
                pending: false,
                data: action.payload
            };
        case "FETCH_CHOSEN_LOCATION_ERROR": 
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
};