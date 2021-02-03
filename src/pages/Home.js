import logoBig from "../assets/images/logo-big.svg";
import LocationForm from "../components/LocationForm.js";

function Home() {
    return (
        <div className="page-wrapper">
            <div className="page-container">
                <img src={logoBig} className="logo-big" />
                <LocationForm />
            </div>
        </div>
    );
}

export default Home;