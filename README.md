
---
# Weather Checker

Welcome to the **Weather Checker** application! This project allows you to check the current weather conditions for various cities using the OpenWeatherMap API. You can search for a city, view detailed weather information, and even visualize some weather metrics with graphs.

## Features

- **Search for Cities**: Easily search for any city to get its current weather.
- **Weather Metrics Visualization**: View important weather metrics such as temperature, humidity, and wind speed in a graphical format.
- **Geolocation Support**: Automatically fetch weather data based on your current location.
- **Unit Toggle**: Switch between Celsius and Fahrenheit to suit your preferences.

## HOW TO RUN LOCALLY?
### Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone this repository**:

   ```bash
   git clone https://github.com/RyuZinOh/weather-checker.git
   cd weather-checker
   ```

2. **Create an environment variable**:

   Create a `.env` file in the root directory of the project and add your OpenWeatherMap API key as follows:

   ```bash
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with the API key you can obtain from [OpenWeatherMap](https://openweathermap.org/api).

3. **Install dependencies**:

   Run the following command to install the required packages:

   ```bash
   npm install
   ```

4. **Run the application**:

   Start the development server with:

   ```bash
   npm start
   ```

   Your application will be running on [http://localhost:3000](http://localhost:3000).

5. **FOR DOCKER**
`docker pull safallama/weathwer-app`
`docker run -p 3000:3000 -e REACT_APP_WEATHER_API_KEY=your_api_key_here safallama/weather-app`

## Usage

Once the application is running, you can:

- Enter the name of a city in the search bar and click "Search" to view the weather information.
- Click on any weather card to see more detailed metrics.
- Use the toggle to switch between Celsius and Fahrenheit.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request. Contributions are welcome!

### NOTE

dynamic map is added but isnt connected to any of the component, u may combine and pull request, i can combine, this will benifit both of us :), untile then completed




---
