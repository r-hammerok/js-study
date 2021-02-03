'use strict';

const 
  income = 'биржа',
  mission = 100000,
  period = 12,
  money = +prompt('Ваш месячный доход?'),
  addExpenses = prompt('Перечислите возможные расходы ' +
   'за рассчитываемый период через запятую'),
  deposit = !!(prompt('Есть ли у вас депозит в банке?')),
  expenses1 = prompt('Введите обязательную статью расходов №1?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов №2?'),
  amount2 = +prompt('Во сколько это обойдется?');

function showTypeOf(data) {
  return typeof data;
}

function getStatusIncome(incomeDay) {
  if (incomeDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (incomeDay >= 600) {
    return 'У вас средний уровень дохода';
  } else if (incomeDay >= 0) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что то пошло не так';
  }
}

function getExpensesMonth() {
  return amount1 + amount2;
}

function getAccumulatedMonth() {
  return money - getExpensesMonth();
}

const
  accumulatedMonth = getAccumulatedMonth(),
  budgetDay = Math.floor(accumulatedMonth / 30);

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

console.log(showTypeOf(money), showTypeOf(income), showTypeOf(deposit));
console.log('Расходы за месяц: ', getExpensesMonth());
console.log(addExpenses.split(', '));
console.log('Срок достижения цели: ', getTargetMonth());
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome(budgetDay));