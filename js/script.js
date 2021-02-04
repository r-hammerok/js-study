const arr = ['4546677','1212334','345665',
             '34567','7676678','765555','211234'];

for (let i = 0; i < arr.length; i++) {
  const firstChar = arr[i].substring(0, 1);
  if (firstChar === '2' || firstChar === '4') {
    console.log(arr[i]);
  }
}

for (let n = 2; n <= 100; n++) {
  let isPrimeNumber = true;
  for (let j = 2; j < n; j++) {
    if (n % j === 0) {
      isPrimeNumber = false;
      break;
    }
  }
  if (isPrimeNumber) {
    console.log('Число ' + n, '. Делители этого числа 1 и ' + n);
  }
}