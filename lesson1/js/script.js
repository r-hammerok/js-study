'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    appData = {
      expenses: {},
      addExpenses: [],
      deposit: false,
      mission: 10000,
      period: 12,
      budget: 0,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за' + 
                'рассчитываемый период через запятую', 'кафе, кино, цветы');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let
          amount,
          expense;

        for (let i = 0; i < 2; i++) {
          expense = prompt('Введите обязательную статью расходов №' + (i+1));
          do {
            amount = prompt('Во сколько обойдется статья №' + (i+1) + '?');
          } while (!isNumber(amount));

          appData.expenses[expense] = +amount;
        }
      },
      getExpensesMonth: function () {
        appData.expensesMonth = 0;
        for (let key in appData.expenses) {
          appData.expensesMonth += appData.expenses[key];
        }
      },
      getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
      },
      getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
      },
      getStatusIncome: function () {
        if (appData.budgetDay>= 1200) {
          return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600) {
          return 'У вас средний уровень дохода';
        } else if (appData.budgetDay >= 0) {
          return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
          return 'Что то пошло не так';
        }
      }
  };

const start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();

appData.budget = money;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);

if (appData.getTargetMonth() >= 0) {
  console.log('Срок достижения цели: ', appData.getTargetMonth());
} else {
  console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key, appData[key]);
}