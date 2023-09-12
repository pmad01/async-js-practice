//Altering the whereAmI function so that it uses the promisified geolocation API
const btn = document.querySelector('.btn-country');
const getPosition = function() {
	return new Promise(function(resolve, reject) {
		// navigator.geolocation.getCurrentPosition(
		//   position => resolve(position),
		//   err => reject(err)
		// );
		navigator.geolocation.getCurrentPosition(resolve, reject); //better alternative to the block above
	});
}

getPosition()
	.then(pos => console.log(pos))
	.catch(err => console.log(err));
const whereAmI = function() {
  getPosition().then(pos => {
    const {latitude: lat, longitude: lng} = pos.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&532960589052457397865x100985`)
  })
    .then(res => {
      if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => console.error(`${err.message} 🥷🏿`))
}

btn.addEventListener('click', whereAmI);
