import preloader from "../assets/images/cloud-simple.svg";

function Preloader() {
    return (
        <div className="preloader">
            <div className="preloader__wrapper">
                <img src={preloader} className="preloader__filler" />
                <img src={preloader} className="preloader__filler" />
                <div className="preloader__containers">
                    <div className="preloader__container"></div>
                    <div className="preloader__container"></div>
                </div>
            </div>
        </div>
    )
}

export default Preloader;