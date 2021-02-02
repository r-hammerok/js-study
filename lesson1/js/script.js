'use strict';

let 
  money = 60000,
  income = 'биржа',
  addExpenses = 'Животные, Кофе, Проезд',
  deposit = false,
  mission = 100000,
  period = 12,
  budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');1
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы ' +
   'за рассчитываемый период через запятую');
deposit = !!(prompt('Есть ли у вас депозит в банке?'));

let expenses1 = prompt('Введите обязательную статью расходов №1?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов №21?');
let amount2 = +prompt('Во сколько это обойдется?');

const budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ', budgetMonth);

console.log('Цель будет достигнута через: ',
                Math.ceil(mission / budgetMonth));

budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ', budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
  console.log('К сожален111ию у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}

