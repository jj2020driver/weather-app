import { useSelector } from "react-redux";
import { getReadableDateTime, formatTemperature, getDailyForecastData } from "../utils/utils.js";

function Forecast() {
    const forecast = useSelector(state => state.forecast);

    let dailyForecastData = [];

    if (!forecast.data || forecast.data.cod != 200) {
        return null;
    } else {
        dailyForecastData = getDailyForecastData(forecast.data.list);
    }

    return (
        <div className="card__module forecast">
            <h2 className="module-title">Weekly Forecast</h2>

            <div className="days">
                {
                    dailyForecastData.map(item => {
                        const itemDate = getReadableDateTime(item.dt);
                        const itemDateOutput = `${itemDate.day}, ${itemDate.date}`;
                        return (
                            <div key={item.dt} className="day">
                                <h3 className="day__title">{ itemDateOutput }</h3>
                                <div className="info-blocks">
                                    <div className="info-block">
                                        <div className="info-block__title">Daytime:</div>
                                        <div className="info-block__value">{ formatTemperature(item.main.temp) } <br/><span className="info-block__value-sm">(feels like { formatTemperature(item.main.feels_like) })</span></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Forecast;