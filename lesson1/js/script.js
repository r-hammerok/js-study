'use strict';

const
  money = +prompt('Ваш месячный доход?'),
  addExpenses = prompt('Перечислите возможные расходы ' +
   'за рассчитываемый период через запятую'),
  deposit = !!(prompt('Есть ли у вас депозит в банке?')),
  income = 'биржа',
  mission = 100000,
  period = 12,
  expenses1 = prompt('Введите обязательную статью расходов №1?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов №21?'),
  amount2 = +prompt('Во сколько это обойдется?'),
  budgetMonth = money - (amount1 + amount2),
  budgetDay = Math.floor(budgetMonth / 30);

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);

console.log('Бюджет на месяц: ', budgetMonth);

console.log('Цель будет достигнута через: ',
                Math.ceil(mission / budgetMonth));

console.log('Бюджет на день: ', budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}

