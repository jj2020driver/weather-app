import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// components
import SelectCustom from "./SelectCustom.js";
import UserLocationButton from "./UserLocationButton.js";

function LocationForm() {
    const [isDataPending, setIsDataPending] = useState(false);
    const userLocation = useSelector(state => state.userLocation);

    useEffect(() => {
        if (userLocation.pending) {
            setIsDataPending(true);
        } else {
            setIsDataPending(false);
        }
    }, [ userLocation.pending ]);

    const className = `search-form${isDataPending ? " data-pending" : ""}`;

    return (
        <form className={className}>
            <SelectCustom isDataPending={isDataPending} />
            <UserLocationButton />
        </form>
    );
}

export default LocationForm;
