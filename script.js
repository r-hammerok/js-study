'use strict';

const week = ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];

// Получаем текущий день недели и приводим его по индексу к нашему массиву,
// где, 0 - это понедельник, а 6 - воскресенье
const now = new Date();
let nowDay = now.getDay() - 1;
if (nowDay < 0) {
  nowDay = 6;
}

for (let i = 0; i < week.length; i++) {
  let innerHTML = week[i];
  if (i >= 5) {
    innerHTML = '<i>' + innerHTML + '</i>';
  }
  if (i === nowDay) {
    innerHTML = '<b>' + innerHTML + '</b>';
  }

  let p = document.createElement('p');
  p.innerHTML = innerHTML;
  document.body.append(p);
}





