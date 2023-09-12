const whereAmI = function(lat, lng) {
	fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&532960589052457397865x100985`)
		.then(res => {
			if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
			return res.json();
		})
		.then(data => {
			console.log(data);
		})
		.catch(err => console.error(`${err.message} 🥷🏿`))
}

whereAmI(52.508, 13.381);