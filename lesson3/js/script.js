'use strict';
const
  lang = 'ru',
  dayRu = ['понедельник','вторник','среда','четверг',
              'пятница','суббота','воскресенье'],
  dayEn = ['monday','tuesday','wednesday','thursday',
              'friday','saturday','sunday'];

let dayRuEn = new Map();
            

console.log('Используя if');
if (lang === 'ru') {
    console.log(dayRu);
} else {
    console.log(dayEn);
}

console.log('Используя switch');
switch (lang) {
  case 'ru':
    console.log(dayRu);
    break;
  default:
    console.log(dayEn);
}

dayRuEn.set('ru', dayRu);
dayRuEn.set('en', dayEn);
console.log('Используя многомерный массив');
console.log(dayRuEn.get(lang));

const namePerson = 'Роман';
console.log(namePerson === 'Артем' ? 'директор' : 
            namePerson === 'Максим' ? 'преподаватель' : 'студент');