import { useSelector } from "react-redux";
import { getReadableDateTime, formatTemperature, formatWind } from "../utils/utils.js";

function CurrentWeather() {
    const chosenLocation = useSelector(state => state.chosenLocation);

    let currentWeatherDateOutput = "";
    let sunriseDateOutput = "";
    let sunsetDateOutput = "";

    if (!chosenLocation.data || chosenLocation.data.cod != 200) {
        return null;
    } else {
        const currentWeatherDate = getReadableDateTime(chosenLocation.data.dt);
        currentWeatherDateOutput = `${currentWeatherDate.fullDay}, ${currentWeatherDate.hours}:${currentWeatherDate.minutes}`;
        const sunriseDate = getReadableDateTime(chosenLocation.data.sys.sunrise);
        sunriseDateOutput = `${sunriseDate.hours}:${sunriseDate.minutes}`;
        const sunsetDate = getReadableDateTime(chosenLocation.data.sys.sunset);
        sunsetDateOutput = `${sunsetDate.hours}:${sunsetDate.minutes}`;
    }

    return (
        <div className="card__module current-weather">
            <h2 className="module-title">{ currentWeatherDateOutput }</h2>
            <div className="info-blocks">
                <div className="info-block">
                    <div className="info-block__title">Temperature:</div>
                    <div className="info-block__value">{ formatTemperature(chosenLocation.data.main.temp) } <span className="info-block__value-sm">(feels like { formatTemperature(chosenLocation.data.main.feels_like) })</span></div>
                </div>
                <div className="info-block">
                    <div className="info-block__title">Pressure:</div>
                    <div className="info-block__value">{ chosenLocation.data.main.pressure }</div>
                </div>
                <div className="info-block">
                    <div className="info-block__title">Humidity:</div>
                    <div className="info-block__value">{ chosenLocation.data.main.humidity }%</div>
                </div>
                <div className="info-block">
                    <div className="info-block__title">Wind:</div>
                    <div className="info-block__value">{ formatWind(chosenLocation.data.wind) }</div>
                </div>
                <div className="info-block">
                    <div className="info-block__title">Sunrise:</div>
                    <div className="info-block__value">{ sunriseDateOutput }</div>
                </div>
                <div className="info-block">
                    <div className="info-block__title">Sunset:</div>
                    <div className="info-block__value">{ sunsetDateOutput }</div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;