'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderCountry = function (data) {
  const html = `
     <article class='country'>
        <img class='country__img' src='${data.flag}' />
        <div class='country__data'>
          <h3 class='country__name'>${data.name}</h3>
          <h4 class='country__region'>${data.region}</h4>
          <p class='country__row'><span>👫</span>${+data.population / 1000000}</p>
          <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
          <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
        </div>
     </article>
  `
  countriesContainer.insertAdjacentHTML('beforeend', html);
}
const renderError= function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
}
// const getJSON = function(url, errorMsg = 'Something went wrong') {
//   return fetch(url)
//     .then(response => {
//     if (!response.ok) {
//       throw new Error(`${errorMsg} ${response.status}`)
//     }
//     return response.json();
//   })
// }
// const getCountryData = function(country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => {
//       console.log(response);
//
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`)
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} MY ERROR`);
//       renderError(`Something went wrong ${err.message} . Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     })
// }
//
// btn.addEventListener('click', () =>  {
//   getCountryData('portugal');
// })
//
// getCountryData('safsafasfsafasf');

/*
const getCountryData = function(country) {
     getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not foind')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      // const neighbour = 'afasfasfaf';
      if (neighbour === undefined) {
        throw new Error (`No neighbour country`);
      }
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found'
      )
    })
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
*/

/*
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
*/

//the event loop
//-> normal logs get printed first, then microtasks, then callbacks.
//-> order:
//1. Test start
//2. Test end
//3. Resolved promise 1
//4. Resolved promise 2(1 milion times)
//5. 0 sec timer
/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res =>
  console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000; i++) {
    console.log(res);
  }
});
console.log('Test end');
 */

//asynchronous lottery simulator
/*
const lotteryPromise =  new Promise(function(resolve, reject) {
  console.log('Draw is happening.');
  setTimeout(function() {
    if(Math.random() >= 0.5) {
      resolve('You WIN')
    } else {
      reject(new Error('You lose...'));
    }
  }, 2000)
});

lotteryPromise.then(res => console.log(res)).catch
(err => console.error(err));
*/

//Promisifying setTimeout -> transformation from a function that accepts a callback
//into a function that returns a promise.
/*
const wait = function(seconds) {
  return new Promise(function(resolve) {
     setTimeout(resolve, seconds * 1000)
  })
}

wait(2).then(() => {
  console.log('I waited for 2 seconds');
  return wait(1)
}).then(() => console.log('I waited for 1 second'));

Promise.resolve('abc').then(x => console.log(x))
Promise.reject(new Error('Problem')).catch(x => console.error(x))

Promisifying an API, in this case the geolocation api.
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
*/

//Altering the whereAmI function so that it uses the promisified geolocation API
/*
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
*/


//async mini app to change images with a 2 sec timer
/*
const wait = function(seconds) {
  return new Promise(function(resolve) {
     setTimeout(resolve, seconds * 1000)
  })
}

const imgContainer = document.querySelector('.images');
const createImage = function(imgPath) {
   return new Promise(function(resolve, reject) {
     const img = document.createElement('img');
     img.src = imgPath;

     img.addEventListener('load', function() {
       imgContainer.append(img);
       resolve(img);
     });

     img.addEventListener('error', function() {
       reject(new Error('Image not found'));
     })
   })
}

let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2)
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg')
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2)
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

//Recreating whereAmI function with async await syntax
/*
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
        console.log(jsonGeoRes);

        //country data
        const res = await fetch(`https://countries-api-836d.onrender.com/countries/name/${jsonGeoRes.country}`);
        if (!res.ok) throw new Error('Problem getting location data');
        const [jsonData] = await res.json(); //array destructuring
        // console.log(jsonData);
        renderCountry(jsonData);
    } catch (err) {
        console.error(err);
        renderError(`${err.message}`)
    }
}

btn.addEventListener('click', whereAmI);
*/