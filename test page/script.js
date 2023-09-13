const btn = document.getElementById('weather-button');
const weatherContainer = document.getElementById('weather-container');
const getPos = function() {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}
const renderWeatherCard = function (countryData, weatherData) {
	const country = countryData.address.country,
	countryCode = countryData.address.country_code.toUpperCase(),
	city = countryData.address.city_district,
	maxTemp = weatherData.daily.temperature_2m_max[0],
	minTemp = weatherData.daily.temperature_2m_min[0],
	maxUvIndex = weatherData.daily.uv_index_max[0],
	maxWindSpeed = weatherData.daily.windspeed_10m_max[0];
	// console.log({
	// 	country,
	// 	city,
	// 	maxTemp,
	// 	minTemp,
	// 	maxUvIndex,
	// 	maxWindSpeed,
	// 	countryCode
	// })
	const html = `
		<div id="weather-card">
    		<h2 id="city-country">${city}, ${country}</h2>
    		<div id="weather-data">
        		<img id="flag" src="https://flagsapi.com/${countryCode}/flat/64.png"">
		        <p>Max Temp: ${maxTemp}&degC</p>
		        <p>Min Temp: ${minTemp}&degC</p>
		        <p>Max UV Index: ${maxUvIndex}</p>
		        <p>Max Wind Speed: ${maxWindSpeed} km/h</p>
    		</div>
		</div>
	`
	weatherContainer.insertAdjacentHTML('beforeend', html);
}

const fetchCountryData = async (lat, lng) => {
	const countryData = await fetch(`https://eu1.locationiq.com/v1/reverse?key=pk.1d4ee746ef1fdbb3bf6f80f381dc52e8&lat=${lat}&lon=${lng}&format=json`);
	if (!countryData.ok) throw new Error('Problem getting country data: Check latitude and longitude values');
	return countryData.json();
}

const fetchWeatherData = async (lat, lng) => {
	const weatherData = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,windspeed_10m_max&timezone=auto`);
	if (!weatherData.ok) throw new Error('Problem getting weather data: Check latitude and longitude values');
	return weatherData.json();
}
const renderError = function(errorMsg) {
	weatherContainer.insertAdjacentText('beforeend', errorMsg);
}
const weather = async function() {
	try {
		const pos = await getPos()
		const {latitude: lat, longitude: lng} = pos.coords;
		const [countryData, weatherData] = await Promise.all([
			fetchCountryData(lat, lng),
			fetchWeatherData(lat, lng)
		]);

		renderWeatherCard(countryData, weatherData);
		return `Weather data for ${countryData.address.city_district}`
	} catch (err) {
		console.error(err);
		renderError(`${err.message}`);

		throw err;
	}

}
btn.addEventListener('click', function () {
	console.log('1: Getting weather data');
	(async function() {
		try {
			const weatherData = await weather();
			console.log(`2: ${weatherData}`)
		} catch (err) {
			console.error(`2: ${err.message}`)
		}
		console.log('3: Finished getting weather data')
	})();
	btn.style.opacity = 0;
});
