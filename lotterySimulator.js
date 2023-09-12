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
