const getJSON = function(url, errorMsg = 'Something went wrong') {
	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`${errorMsg} ${response.status}`)
			}
			return response.json();
		})
}


//Promise.race, settles as soon as the first input is settled, does not matter if promise is rejected or fulfilled
//First settled promise wins the race
const promiseRace = async function () {
	const res = await Promise.race([
		getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
		getJSON(`https://countries-api-836d.onrender.com/countries/name/albania`),
		getJSON(`https://countries-api-836d.onrender.com/countries/name/portugal`)
	]);
	console.log(res[0]);
};
// promiseRace();

const timeout = function (sec) {
	return new Promise(function (_, reject){
		setTimeout(function () {
			reject(new Error('Request took too long'))
		}, sec * 1000);
	});
}

//Racing a promise with a timeout
// Promise.race([
// 	getJSON(`https://countries-api-836d.onrender.com/countries/name/albania`),
// 	timeout(1)
// ])
// 	.then(res => console.log(res[0]))
// 	.catch(err => console.error(err));

//Promise.allSettled. Takes an array of promises and returns an array of all SETTLED promises
//Difference will Promise.all: Promise.allSettled does not shortcircuit if one promise fails, it never shortcircuits
// Promise.allSettled([
// 	Promise.resolve('Success'),
// 	Promise.reject('Error'),
// 	Promise.resolve('Another success'),
// ]).then(res => console.log(res));

//Promise.any -> Returns the first fulfilled promise
// Promise.any([
// 	Promise.resolve('Success'),
// 	Promise.reject('Error'),
// 	Promise.resolve('Another success'),
// ]).then(res => console.log(res));