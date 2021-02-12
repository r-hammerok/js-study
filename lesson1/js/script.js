'use strict';

const 
  isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  
  isText = function(t) {
    if (typeof t === 'string') {
      t = t.trim();
    }
    return t && !isNumber(t);
  },

  btnStart = document.getElementById('start'),
  btnAddIncome = document.getElementsByTagName('button')[0],
  btnAddExpenses = document.getElementsByTagName('button')[1],
  checkDeposit = document.querySelector('#deposit-check'),
  additionalIncome = document.querySelectorAll('input.additional_income-item'),
  budgetMonth = document.getElementsByClassName('budget_month-value')[0],
  budgetDay = document.getElementsByClassName('budget_day-value')[0],
  expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
  addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  period = document.getElementsByClassName('income_period-value')[0],
  targetMonth = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('input.salary-amount'),
  incomeTitle = document.querySelector('input.income-title'),
  expensesTitle = document.querySelector('input.expenses-title'),
  expensesAmount = document.querySelector('input.expenses-amount'),
  addExpensesItem = document.querySelector('input.additional_expenses-item'),
  depositAmount = document.querySelector('input.deposit-amount'),
  depositPercent = document.querySelector('input.deposit-percent'),
  targetAmount = document.querySelector('input.target-amount'),
  periodSelect = document.querySelector('input.period-select'),
  incomeItems = document.querySelectorAll('.income-items');

let appData = {
      income: {},
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      percentDeposit: 0,
      moneyDeposit: 0,
      budget: 0,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      incomeMonth: 0,
      start: function() {

        if (salaryAmount.value === '') {
          alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
          return;
        }

        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
      },
      showResult: function() {
        budgetMonth.value = appData.budgetMonth;
        budgetDay.value = appData.budgetDay;
        expensesMonth.value = appData.expensesMonth;
        addIncomeValue.value = appData.addIncome.join(', ');
        addExpensesValue.value = appData.addExpenses.join(', ');
        targetMonth.value = appData.getTargetMonth();
        period.value = appData.calcSavedMoney();
      },
      addExpensesBlock: function() {
        const expensesItems = document.querySelectorAll('.expenses-items');
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnAddExpenses);
        if (expensesItems.length === 2) {
          btnAddExpenses.style.display = 'none';
        }
      },
      getExpenses: function() {
        const expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function(item){
          const
            itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
              appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
      },
      getIncome: function() {
        incomeItems.forEach(function(item) {
          const
            itemIncome = item.querySelector('.income-title').value.trim(),
            cashIncome = item.querySelector('.income-amount').value.trim();
            if (itemIncome !== '' && cashIncome !== '') {
              appData.income[itemIncome] = +cashIncome;
              appData.incomeMonth += +cashIncome;
            }
        });
        // if (confirm('Есть ли у вас дополнительный источник заработок?')) {
        //   let itemIncome, cashIncome;
        //   do {
        //     itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
        //   } while (!isText(itemIncome));
        //   do {
        //     cashIncome = prompt('Сколько вы на этом зарабатываете?','10000');
        //   } while (!isNumber(cashIncome));
        //   appData.income[itemIncome.trim()] = +cashIncome;
        // }

        // for (let key in appData.income) {
        //   appData.incomeMonth += appData.income[key];
        // }
      },
      getAddExpenses: function() {
        const addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
          item = item.trim();
          if (item !== '') {
            appData.addExpenses.push(item);
          }
        });
      },
      getAddIncome: function() {
        additionalIncome.forEach(function(item) {
          const itemValue = item.value.trim();
          if (itemValue !== '') {
            appData.addIncome.push(itemValue);
          }
        });
      },
      asking: function() {



        let addExpenses = prompt('Перечислите возможные расходы за' + 
                'рассчитываемый период через запятую', 'кафе, кино, цветы');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        for (let i = 0; i < appData.addExpenses.length; i++) {
          let item = appData.addExpenses[i].trim();
          item = item.charAt(0).toUpperCase() + item.slice(1);
          appData.addExpenses[i] = item;
        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        // let
        //   amount,
        //   expense;

        // for (let i = 0; i < 2; i++) {
        //   do {
        //     expense = prompt(`Введите обязательную статью расходов № ${i+1}`, `Статья ${i+1}`);
        //   } while (!isText(expense));
        //   do {
        //     amount = prompt(`Во сколько обойдется статья № ${i+1}?`, `${(i+1)*1000}`);
        //   } while (!isNumber(amount));

        //   appData.expenses[expense.trim()] = +amount;
        // }

        appData.getInfoDeposit();

      },
      getExpensesMonth: function () {
        appData.expensesMonth = 0;
        for (let key in appData.expenses) {
          appData.expensesMonth += appData.expenses[key];
        }
      },
      getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
      },
      getTargetMonth: function () {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
        return appData.budgetMonth * periodSelect.value;
      }
  };

  btnStart.addEventListener('click', appData.start);

  btnAddExpenses.addEventListener('click', appData.addExpensesBlock);

/*

start();

appData.budget = money;


if (appData.getTargetMonth() >= 0) {
  console.log('Срок достижения цели: ', appData.getTargetMonth());
} else {
  console.log('Цель не будет достигнута');
}

*/
