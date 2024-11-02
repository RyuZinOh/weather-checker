import React, { useState } from 'react';
import MapCard from './MapCard';
import '../css/WeatherMap.css';

//----------
// WeatherMap component
// Manages the state of the map card and handles its visibility
//-------------
const WeatherMap = ({ weatherData, unit }) => {
    const [isMapCardOpen, setIsMapCardOpen] = useState(false);

    //---------- 
    // Toggle the visibility of the MapCard
    //-------------
    const toggleMapCard = () => {
        setIsMapCardOpen(prevState => !prevState);
    };

    return (
        <div className="weather-map">
            <div className="circular-map" onClick={toggleMapCard}>
                <span>🗺️</span> {/* Use a map icon or image */}
            </div>
            {/* Conditionally render the MapCard based on the isMapCardOpen state */}
            {isMapCardOpen && <MapCard isOpen={isMapCardOpen} onClose={toggleMapCard} />}
        </div>
    );
};

export default WeatherMap;
