const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.country__container');
const renderCountry = function (data) {
	const html = `
        <img class="country__img" src="${data.flag}" alt="${data.name} Flag" />
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>Population: </span>${(+data.population / 1000000).toFixed(2)} million</p>
        <p class="country__row"><span>Language: </span>${data.languages[0].name}</p>
        <p class="country__row"><span>Currency: </span>${data.currencies[0].name}</p>
  `
	countriesContainer.insertAdjacentHTML('beforeend', html);
}
const renderError = function(msg) {
	countriesContainer.insertAdjacentText('beforeend', msg);
}
const getCountryData = function(country) {
	fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
		.then(response => {
			console.log(response);

			if (!response.ok) {
				throw new Error(`Country not found ${response.status}`)
			}
			return response.json();
		})
		.then(data => {
			renderCountry(data[0]);
			const neighbour = data[0].borders?.[0];
			return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
		})
		.then(response => response.json())
		.then(data => renderCountry(data, 'neighbour'))
		.catch(err => {
			console.error(`${err} MY ERROR`);
			renderError(`Something went wrong ${err.message} . Try again!`);
		})
		.finally(() => {
			countriesContainer.style.opacity = 1;
		})
}

btn.addEventListener('click', () =>  {
	getCountryData('portugal');
})

// getCountryData('safsafasfsafasf');