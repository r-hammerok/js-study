'use strict';
const
  lang = 'ru',
  dayRu = ['понедельник','вторник','среда','четверг',
              'пятница','суббота','воскресенье'],
  dayEn = ['monday','tuesday','wednesday','thursday',
              'friday','saturday','sunday'];

console.log('Используя if');
if (lang === 'ru') {
  for (let i = 0; i < dayRu.length; i++) {
    console.log(dayRu[i]);
  }
} else {
  for (let i = 0; i < dayEn.length; i++) {
    console.log(dayEn[i]);
  }
}

console.log('Используя switch');
switch (lang) {
  case 'ru':
    for (let i = 0; i < dayRu.length; i++) {
      console.log(dayRu[i]);
    }
    break;
  default:
    for (let i = 0; i < dayEn.length; i++) {
      console.log(dayEn[i]);
    }
}

const dayRuEn = [dayRu, dayEn];
const index = lang === 'ru' ? 0 : 1;
console.log('Используя многомерный массив');
for (let i = 0; i < dayRuEn[index].length; i++) {
  console.log(dayRuEn[index][i]);
}

const namePerson = 'Роман';
console.log(namePerson === 'Артем' ? 'директор' : 
            namePerson === 'Максим' ? 'преподаватель' : 'студент');