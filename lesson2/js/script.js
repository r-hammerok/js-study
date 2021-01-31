const num = 266219;

let multi = 1; // Произведение цифр числа
for (var i = 0; i < String(num).length; i++) {
  multi *= String(num)[i];
}
multi **= 3;

console.log(String(multi).substr(0,2));