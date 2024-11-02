import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/MapCard.css';
import L from 'leaflet';

//----------
// Configure Leaflet default marker icons
//-------------
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

//----------
// MapCard component
// Displays a map with weather data markers
//-------------
const MapCard = ({ isOpen, onClose, weatherData = [], unit }) => {
    const position = [51.505, -0.09]; 

    return (
        <div className={`map-card ${isOpen ? 'open' : ''}`}>
            <button onClick={onClose} className="close-button">Close</button>
            <h2>Map</h2>
            {/* Leaflet Map */}
            <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {weatherData.length > 0 ? (
                    weatherData.map(data => (
                        <Marker key={data.id} position={[data.coord.lat, data.coord.lon]}>
                            <Popup>
                                <strong>{data.name}</strong><br />
                                Temperature: {data.main.temp}°{unit === 'metric' ? 'C' : 'F'}
                            </Popup>
                        </Marker>
                    ))
                ) : (
                    <Marker position={position}>
                        <Popup>No weather data available.</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default MapCard;
