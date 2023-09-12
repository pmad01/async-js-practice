// Promisifying an API, in this case the geolocation api.
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
