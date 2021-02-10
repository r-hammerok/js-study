'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isText = function(t) {
  if (typeof t === 'string') {
    t = t.trim();
  }
  return t && !isNumber(t);
}

let money,
    appData = {
      income: {},
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      percentDeposit: 0,
      moneyDeposit: 0,
      mission: 10000,
      period: 12,
      budget: 0,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      asking: function() {

        if (confirm('Есть ли у вас дополнительный источник заработок?')) {
          let itemIncome, cashIncome;
          do {
            itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
          } while (!isText(itemIncome));
          do {
            cashIncome = prompt('Сколько вы на этом зарабатываете?','10000');
          } while (!isNumber(cashIncome));
          appData.income[itemIncome.trim()] = +cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за' + 
                'рассчитываемый период через запятую', 'кафе, кино, цветы');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        for (let i = 0; i < appData.addExpenses.length; i++) {
          let item = appData.addExpenses[i].trim();
          item = item.charAt(0).toUpperCase() + item.slice(1);
          appData.addExpenses[i] = item;
        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let
          amount,
          expense;

        for (let i = 0; i < 2; i++) {
          do {
            expense = prompt(`Введите обязательную статью расходов № ${i+1}`, `Статья ${i+1}`);
          } while (!isText(expense));
          do {
            amount = prompt(`Во сколько обойдется статья № ${i+1}?`, `${(i+1)*1000}`);
          } while (!isNumber(amount));

          appData.expenses[expense.trim()] = +amount;
        }

        appData.getInfoDeposit();

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
      },
      getInfoDeposit: function () {
        if (appData.deposit) {
          let percentDeposit, moneyDeposit;
          do {
            percentDeposit = prompt('Какой годовой процент?','10');
          } while (!isNumber(percentDeposit) || percentDeposit <= 0);
          appData.percentDeposit = +percentDeposit;
          do {
            moneyDeposit = prompt('Какая сумма заложена?','10000');
          } while (!isNumber(moneyDeposit) || moneyDeposit <= 0);
          appData.moneyDeposit = +moneyDeposit;
        }
      },
      calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
      }
  };

const start = function() {
  do {
    money = prompt('Ваш месячный доход?', '10000');
  } while (!isNumber(money));
};

/*

start();

appData.budget = money;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Возможные расходы за месяц: ', appData.addExpenses.join(', '));

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

*/

const btnStart = document.getElementById('start');

const btnAddIncome = document.getElementsByTagName('button')[0];
const btnAddExpenses = document.getElementsByTagName('button')[1];

const checkDeposit = document.querySelector('#deposit-check');

const additionalIncome1 = document.querySelector('input.additional_income-item')[0];
const additionalIncome2 = document.querySelector('input.additional_income-item')[1];


