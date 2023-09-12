//Recreating whereAmI function with async await syntax
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
const getPosition = function() {
  return new Promise(function(resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject); //better alternative to the block above
  });
}

//async function -> a function that returns a promise
const whereAmI = async function() {
    try{
        //the value of the await expression, is going to be the resolved value of the promise,
        //so there is no need to consume promises with '.then'
        //geolocation
        const pos = await getPosition();
        const {latitude: lat, longitude: lng} = pos.coords;

        //reverse geocoding
        const geoRes = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&532960589052457397865x100985`);
        if (!geoRes.ok) throw new Error('Problem getting country');
        const jsonGeoRes = await geoRes.json();

        //country data
        const res = await fetch(`https://countries-api-836d.onrender.com/countries/name/${jsonGeoRes.country}`);
        if (!res.ok) throw new Error('Problem getting location data');
        const [jsonData] = await res.json(); //array destructuring
        renderCountry(jsonData);
		return `You are in ${jsonGeoRes.city}, ${jsonGeoRes.country}`
    } catch (err) {
        console.error(err);
        renderError(`${err.message}`);

		//rethrowing the error to catch it in the block below
		throw err;
    }
}

// btn.addEventListener('click', whereAmI);
console.log('1: Will get location');

//not a good idea, mixing two ways of dealing with promises together, '.then, .catch, etc' and 'async await'
// whereAmI()
// 	.then(city => console.log(`2: ${city}`))
// 	.catch(err => console.error(`2: ${err.message}`))
// 	.finally(() => console.log('3: Finished getting location'));

//better way
(async function() {
	try {
		const city = await whereAmI();
		console.log(`2: ${city}`)
	} catch (err) {
		console.error(`2: ${err.message}`)
	}
	console.log('3: Finished getting location')
})();