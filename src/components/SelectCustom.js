import { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import { useHistory } from "react-router-dom";
import { fetchChosenLocationSuccess, fetchChosenLocation } from "../store/chosenLocation.js";
import { fetchForecast } from "../store/forecast.js";
import { useSelector, useDispatch } from "react-redux";
import { addToLocalStorage, getFromLocalStorage } from "../utils/utils.js";

const DropdownIndicator = (props) => null;
const IndicatorSeparator = (props) => null;

async function fetchCityInput({ city }) {
    const url = "http://api.openweathermap.org/data/2.5/weather";
    const apiKey = "cfef6851883684acafd83bd9c8128de5";
    const response = await fetch(`${url}?q=${city}&appid=${apiKey}&units=metric`);
    const json = await response.json();
    return json;
}


function SelectCustom({ isDataPending }) {
    const [showMenu, setShowMenu] = useState(false);
    const [fetchedLocationInput, setFetchedLocationInput] = useState({});
    const history = useHistory();
    const isFetchingWeather = useSelector(state => state.forecast);
    const dispatch = useDispatch();
    const defaultOptions = getFromLocalStorage("chosenLocationsHistory");
    
    function handleGetResults(value) {
        return fetchCityInput({ city: value })
            .then(response => {
                if (response.cod === 200) {
                    setFetchedLocationInput(response);
                    return [{ value: response.id, label: `${response.name} (${response.sys.country})` }];
                } else {
                    return [];
                }
            });
    }

    function promiseOptions(inputValue) {
        const value = inputValue.trim();
        if (value.length < 3) {
            return Promise.resolve();
        } else {
            return handleGetResults(value);
        }
    }

    function handleChange({ value, label }) {
        if (fetchedLocationInput.id) {
            dispatch(fetchChosenLocationSuccess(fetchedLocationInput));
        } else {
            dispatch(fetchChosenLocation({ id: value }));
        }
        dispatch(fetchForecast({ id: value }));
        addToLocalStorage('chosenLocationsHistory', { value: value, label: label });
        history.push("/card");
    }

    useEffect(() => {
        if (isFetchingWeather.pending) {
            history.push("/card");
        }
    }, [ isFetchingWeather ]);

    let className = `select${showMenu ? " select--show-menu" : ""}`;
    return (
        <AsyncSelect
            className={className}
            classNamePrefix="select"
            placeholder="Search by city..."
            isLoading={isDataPending}
            defaultOptions={defaultOptions}
            loadOptions={promiseOptions}
            onChange={handleChange}
            components={{ DropdownIndicator, IndicatorSeparator }}
        />
    );
}

export default SelectCustom;