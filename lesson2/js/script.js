let num = 266219;

let strNum = String(num);
let multi = 1; // Произведение цифр числа
for (var i = 0; i < strNum.length; i++) {
  multi *= strNum[i];
}
multi **= 3;

console.log(String(multi).substr(0,2));