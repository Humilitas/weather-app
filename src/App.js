import './App.css';
import React, {useEffect, useState} from "react";
import Weather from './components/weather';
import {Dimmer, Loader} from "semantic-ui-react";

export default function App() {

    const [lat, setLat] = useState(NaN);
    const [long, setLong] = useState(NaN);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });
            if (!Number.isNaN(lat) && !Number.isNaN(long)) {
                console.log(lat + ',' + long);
                await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
                    .then(res => res.json())
                    .then(result => {
                        setData(result);
                        console.log(result);
                    });
            }
        }
        fetchData();
    }, [lat, long]);

    return (
        <div className="App">
            {(typeof data.main != 'undefined') ? (
                <Weather weatherData={data} setData={setData}/>
            ) : (
                <div>
                    <Dimmer active>
                        <Loader>Loading..</Loader>
                    </Dimmer>
                </div>
            )}
        </div>
    );
}