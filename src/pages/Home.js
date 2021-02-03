import logoBig from "../assets/images/logo-big.svg";
import LocationForm from "../components/LocationForm.js";

function Home() {
    return (
        <div className="page-wrapper">
            <div className="page-container">
                <img src={logoBig} className="logo-big" />
                <LocationForm />
                {/* <code>
                    {
                        JSON.stringify({"coord":{"lon":30.5241,"lat":50.4501},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":268.15,"feels_like":261.24,"temp_min":268.15,"temp_max":268.15,"pressure":1007,"humidity":93},"visibility":10000,"wind":{"speed":6,"deg":30},"snow":{"1h":0.1},"clouds":{"all":75},"dt":1612202015,"sys":{"type":1,"id":8903,"country":"UA","sunrise":1612157572,"sunset":1612191000},"timezone":7200,"id":703448,"name":"Kyiv","cod":200}, null, 2)
                    }
                </code> */}
            </div>
        </div>
    );
}

export default Home;