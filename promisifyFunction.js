//Promisifying setTimeout -> transformation from a function that accepts a callback
//into a function that returns a promise.
const wait = function(seconds) {
  return new Promise(function(resolve) {
     setTimeout(resolve, seconds * 1000)
  })
}

wait(2).then(() => {
  console.log('I waited for 2 seconds');
  return wait(1)
}).then(() => console.log('I waited for 1 second'));


