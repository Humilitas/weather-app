import React, {useState} from 'react';
import './styles.css';
import {Button} from 'semantic-ui-react'
import moment from "moment";

const refresh = () => {
    window.location.reload();
};
const weatherIcons = {
    '01d': {
        icon: 'images/sunny.png'
    },
    '01n': {
        icon: 'images/sunny-night.png'
    },
    '02d': {
        icon: 'images/partly-cloudy.png'
    },
    '02n': {
        icon: 'images/partly-cloudy-night.png'
    },
    '03d': {
        icon: 'images/partly-cloudy.png'
    },
    '03n': {
        icon: 'images/partly-cloudy-night.png'
    },
    '04d': {
        icon: 'images/cloudy.png'
    },
    '04n': {
        icon: 'images/cloudy-night.png'
    },

    '09d': {
        icon: 'images/rainstorm.png'
    },
    '09n': {
        icon: 'images/rainstorm.png'
    },
    '10d': {
        icon: 'images/rainy.png'
    },
    '10n': {
        icon: 'images/rainy.png'
    },
    '11d': {
        icon: 'images/rainy.png'
    },
    '11n': {
        icon: 'images/rainy.png'
    },
    '13d': {
        icon: 'images/snowy.png'
    },
    '13n': {
        icon: 'images/snowy.png'
    },
    '50d': {
        icon: 'http://openweathermap.org/img/wn/50d@2x.png'
    },
    '05n': {
        icon: 'http://openweathermap.org/img/wn/50d@2x.png'
    },

}
const Weather = ({weatherData, setData}) => {
    let [city, setCity] = useState('');
    let [showSearch, setShowSearch] = useState(false);
    const icon = weatherData.weather[0].icon;
    const iconPath = weatherIcons[icon].icon;

    const toggleShowSearch = () => {
        setShowSearch(!showSearch);
    };
    const searchCity = () => {
        fetch(`${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                if (result.cod === 200) {
                    setData(result);
                    setShowSearch(false);
                } else {
                    alert(result.message);
                    window.location.reload();
                }
            });
    }
    const changeCity = (e) => {
        setCity(e.target.value);
    }
    const handleKeyPress = (e) => {
        if (e.charCode === 13 || e.key === 'Enter') {
            setCity(e.target.value);
            searchCity();
        }
    }

    return (
        <div className="main">
            <div className="top">
                <p className="header" onClick={toggleShowSearch}>{weatherData.name}</p>
                <Button className="button" inverted circular icon='refresh' onClick={refresh}/>
            </div>
            <div className="ui action input" style={{display: showSearch ? 'flex' : 'none'}}>
                <input type="text" placeholder="Search..." onChange={changeCity} onKeyPress={handleKeyPress}/>
                <button className="ui button" onClick={searchCity}>Search</button>
            </div>
            <img className="weather-icon" src={iconPath} alt=""/>
            <div className="flex">
                <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
                <p className="description">{weatherData.weather[0].description}</p>
            </div>

            <div className="flex">
                <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>
                <p className="temp">Humidity: {weatherData.main.humidity} %</p>
            </div>
            <div className="flex">
                <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </div>
        </div>
    )
}

export default Weather;