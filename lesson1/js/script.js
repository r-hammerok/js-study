'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const 
  income = 'биржа',
  mission = 100000,
  period = 12,
  addExpenses = prompt('Перечислите возможные расходы ' +
   'за рассчитываемый период через запятую', 'кафе, кино, цветы'),
  // deposit = !!(prompt('Есть ли у вас депозит в банке?', 'нет'));
  deposit = confirm('Есть ли у вас депозит в банке?');

let money;

const start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();

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

let expenses = [];

const getExpensesMonth = function () {
  let
    sum = 0,
    amount;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов №' + (i+1));

    do {
      amount = prompt('Во сколько обойдется статья №' + (i+1) + '?');
    } while (!isNumber(amount));
    sum += +amount;
  }
  return sum;
};

const expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
  return money - expensesAmount;
}

const
  accumulatedMonth = getAccumulatedMonth(),
  budgetDay = Math.floor(accumulatedMonth / 30);

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

const targetMonth = getTargetMonth();

console.log(showTypeOf(money), showTypeOf(income), showTypeOf(deposit));
console.log(addExpenses.split(', '));
console.log('Обязательные статьи расходов: ', expenses);
console.log('Расходы за месяц: ', expensesAmount);

if (targetMonth >= 0) {
  console.log('Срок достижения цели: ', targetMonth);
} else {
  console.log('Цель не будет достигнута');
}

console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome(budgetDay));