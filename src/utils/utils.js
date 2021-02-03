export function getReadableDateTime(dailyTimeStampSec) {
    const date = new Date(dailyTimeStampSec * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return {
        date: date.getDate(),
        fullDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()],
        day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
        hours: hours < 10 ? `0${hours}` :  hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes
    };
};

export function formatTemperature(temp) {
    return `${Math.round(temp)}°C`;
};

export function formatWind(wind) {
    return `${Math.round(wind.speed)} m/s`;
};

export function getDailyForecastData(list) {
    let filteredByDay = list.reduce((acc, item, index, array) => {
        if ( ( new Date().getDate() !== getReadableDateTime(item.dt).date )
             && ( !acc.find(elem => getReadableDateTime(elem.dt).date === getReadableDateTime(item.dt).date)) ) {

            if (getReadableDateTime(item.dt).hours === 14) {
                return [...acc, item];
            }
        }
        return [...acc];
    }, []);
    return filteredByDay;
};


export function addToLocalStorage(storageName, newItem) {
    const history = JSON.parse(localStorage.getItem(storageName));

    let updatedHistory = [];
    if (!history) {
        updatedHistory.push(newItem);
    } else {
        if (history.find(item => item.value === newItem.value)) {
            updatedHistory = [newItem, ...history.filter(item => item.value !== newItem.value)];
        } else {
            updatedHistory = [newItem, ...history];
            if (updatedHistory.length > 5) {
                updatedHistory.length = 5;
            }
        }
    }

    localStorage.setItem(storageName, JSON.stringify(updatedHistory));
}

export function getFromLocalStorage(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
}