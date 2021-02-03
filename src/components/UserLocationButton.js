import { useSelector, useDispatch } from "react-redux";
import { getUserLocation } from "../store/userLocation.js";
import { fetchChosenLocation } from "../store/chosenLocation.js";
import { fetchForecast } from "../store/forecast.js";

function UserLocationButton() {
    const userLocation = useSelector(state => state.userLocation);
    const dispatch = useDispatch();

    function handleClick() {
        if (userLocation.data) {
            dispatch(fetchChosenLocation({ id: userLocation.data.id }));
            dispatch(fetchForecast({ id: userLocation.data.id }));
        } else {
            dispatch(getUserLocation());
        }
    }

    return <button type="button" onClick={ handleClick }>Current location</button>;
}

export default UserLocationButton;