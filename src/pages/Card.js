import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// components
import CurrentWeather from "../components/CurrentWeather.js";
import Forecast from "../components/Forecast.js";
import Preloader from "../components/Preloader.js"

function Card() {
    const [pageLoaded, setPageLoaded] = useState(false);
    const chosenLocation = useSelector(state => state.chosenLocation);
    const forecast = useSelector(state => state.forecast);

    useEffect(() => {
        setPageLoaded(true);
    }, []);

    if (chosenLocation.pending || forecast.pending) {
        return (
            <div className="page-wrapper">
                <div className="page-container page-container--center">
                    <Preloader />
                </div>
            </div>
        );
    }
    if (!chosenLocation.data || !forecast.data) {
        return <Redirect to="/" />;
    } else {
        return (
            <div className="page-wrapper">
                <div className="page-container">
                    <Link to="/" className="nav-link"><span>&larr;</span> search for another location</Link>
                    <div className={`card animate${pageLoaded ? " animated" : ""}`}>
                        <h1 className="card__title">Weather for { chosenLocation.data.name } ({ chosenLocation.data.sys.country }) </h1>
                        <CurrentWeather />
                        <Forecast />
                    </div> 
                </div>
            </div>
        );
    }
}

export default Card;