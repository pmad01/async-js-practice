//the event loop
//-> normal logs get printed first, then microtasks, then callbacks.
//-> order:
//1. Test start
//2. Test end
//3. Resolved promise 1
//4. Resolved promise 2(1 milion times)
//5. 0 sec timer

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
