import './appBanner.scss'
import avengers from '../../resources/img/Avengers.png'
// import avengersLogo from '../../resources/img/Avengers-logo.png'
import avengersLogo from '../../resources/img/AvengersLogo.svg'

const AppBanner = () => {
    return (
        <div className="app__banner">
            <img src={avengers} alt="avengers" />
            <h1 className="app__banner-title">
            New comics every week!
            <br />
            Stay tuned!</h1>
            <img src={avengersLogo} alt="Avengers Logo" />
        </div>
    );
}

export default AppBanner;