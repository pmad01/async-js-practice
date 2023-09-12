const getJSON = function(url, errorMsg = 'Something went wrong') {
	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`${errorMsg} ${response.status}`)
			}
			return response.json();
		})
}
const get3Countries = async function(c1, c2, c3) {
	try {
		// const [country1] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`);
		// const [country2] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`);
		// const [country3] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`);

		//one rejected promise is enough for it all to fail
		//we run them in parallel because they do not depend on eachother
		const data = await Promise.all([
			getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
			getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
			getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`)
		]);

		console.log(data.map(country => country[0].capital));
	} catch (err) {
		console.error(err)
	}
}

get3Countries('portugal', 'canada', 'albania')