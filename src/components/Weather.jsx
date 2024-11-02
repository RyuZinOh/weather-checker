import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import WeatherMap from './WeatherMap';
import '../css/Weather.css';
import blossomg from '../assets/blossom.png';

// Register the necessary components for charting
Chart.register(CategoryScale, LinearScale, BarElement);

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState('');
    const [unit, setUnit] = useState('metric');
    const [selectedWeather, setSelectedWeather] = useState(null);
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    // Fetch weather data based on city name or coordinates
    const fetchWeatherData = useCallback(async (cityName, lat, lon) => {
        const url = lat && lon 
            ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
            : `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

        try {
            const { data } = await axios.get(url);
            setWeatherData(prevData => {
                const existingIndex = prevData.findIndex(d => d.name === data.name);
                return existingIndex > -1 
                    ? prevData.map((d, index) => index === existingIndex ? data : d)
                    : [data, ...prevData];
            });
            setError('');
        } catch {
            setError('City not found. Please try again.');
        }
    }, [unit, apiKey]);

    // Fetch weather data by coordinates
    const fetchWeatherByCoordinates = useCallback((lat, lon) => {
        fetchWeatherData(null, lat, lon);
    }, [fetchWeatherData]);

    // Fetch weather data by city name
    const fetchWeatherByCity = async (cityName) => {
        if (!cityName.trim()) {
            setError('Please enter a city name.');
            return;
        }
        await fetchWeatherData(cityName);
    };

    // Get user's current location and fetch weather data
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    ({ coords: { latitude, longitude } }) => {
                        fetchWeatherByCoordinates(latitude, longitude);
                    },
                    () => setError('Unable to retrieve location. Please search manually.')
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };
        getLocation();
    }, [fetchWeatherByCoordinates]);

    // Handle changes in the search input
    const handleSearchChange = (e) => {
        setCity(e.target.value);
    };

    // Handle changes in temperature unit selection
    const handleUnitChange = (e) => {
        const newUnit = e.target.value;
        setUnit(newUnit);
        weatherData.forEach(data => fetchWeatherData(data.name));
    };

    // Get corresponding weather icon based on weather condition
    const getWeatherIcon = (weatherMain) => {
        const icons = {
            Clear: <WiDaySunny size={50} />,
            Clouds: <WiCloud size={50} />,
            Rain: <WiRain size={50} />,
            Snow: <WiSnow size={50} />,
            Thunderstorm: <WiThunderstorm size={50} />
        };
        return icons[weatherMain] || <WiCloud size={50} />;
    };

    // Handle card click to display detailed weather information
    const handleCardClick = (data) => {
        setSelectedWeather(data);
    };

    // Close the detailed view of weather information
    const closeDetailView = () => {
        setSelectedWeather(null);
    };

    return (
        <div className="weather-container">
            <img src={blossomg} alt="Blossom Illustration" className="top-right-illustration" />
            <h1>Weather App</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button onClick={() => fetchWeatherByCity(city)} className="search-button">Search</button>
            </div>
            <div className="unit-toggle">
                <label>
                    <input
                        type="radio"
                        value="metric"
                        checked={unit === 'metric'}
                        onChange={handleUnitChange}
                    />
                    Celsius
                </label>
                <label>
                    <input
                        type="radio"
                        value="imperial"
                        checked={unit === 'imperial'}
                        onChange={handleUnitChange}
                    />
                    Fahrenheit
                </label>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="weather-cards">
                {weatherData.map((data, index) => (
                    <div key={index} className={`weather-card ${data.weather[0].main.toLowerCase()}`} onClick={() => handleCardClick(data)}>
                        <h2>{data.name}, {data.sys.country}</h2>
                        <div className="weather-icon">
                            {getWeatherIcon(data.weather[0].main)}
                        </div>
                        <p>Temperature: {data.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                        <p>Weather: {data.weather[0].description}</p>
                        <p>Humidity: {data.main.humidity}%</p>
                        <p>Wind Speed: {data.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
                    </div>
                ))}
            </div>
            {selectedWeather && (
                <div className="weather-detail">
                    <button onClick={closeDetailView} className="close-button">Close</button>
                    <h2>{selectedWeather.name}, {selectedWeather.sys.country}</h2>
                    <p>Temperature: {selectedWeather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                    <p>Weather: {selectedWeather.weather[0].description}</p>
                    <Bar
                        data={{
                            labels: ['Temperature', 'Humidity', 'Wind Speed'],
                            datasets: [
                                {
                                    label: 'Weather Metrics',
                                    data: [
                                        selectedWeather.main.temp,
                                        selectedWeather.main.humidity,
                                        selectedWeather.wind.speed
                                    ],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.6)', 
                                        'rgba(54, 162, 235, 0.6)', 
                                        'rgba(75, 192, 192, 0.6)'
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
            )}
            <WeatherMap weatherData={weatherData} unit={unit} />
        </div>
    );
};

export default Weather;
