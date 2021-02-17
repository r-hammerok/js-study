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
  allInputs = document.querySelectorAll('input');

let 
  expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items'),

  appData = {
      income: {},
      addIncome: [],
      expenses: {},
      addExpenses: [],
      percentDeposit: 0,
      moneyDeposit: 0,
      budget: 0,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      incomeMonth: 0,
      start: function() {
        this.budget = +salaryAmount.value;
        this.getIncome();
        this.getExpenses();
        this.getInfoDeposit();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();

        this.blockInputFields();
      },
      checkSalary: function() {
        btnStart.disabled = !isNumber(salaryAmount.value);
      },
      onlyText: function(e) {
        if (e.charCode !== 32 && e.charCode !== 44 && e.charCode !== 46 && 
              e.charCode !== 1025 && e.charCode !== 1105 && 
                 (e.charCode < 1040 || e.charCode > 1103)) {
          e.preventDefault();
        }
      },
      onlyNumber: function(e) {
        if (e.charCode < 48 || e.charCode > 57 ) {
          e.preventDefault();
        }
      },
      showResult: function() {
        periodSelect.addEventListener('change', function() 
        {
          period.value = appData.calcSavedMoney();
        });

        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        addIncomeValue.value = this.addIncome.join(', ');
        addExpensesValue.value = this.addExpenses.join(', ');
        targetMonth.value = this.getTargetMonth();
        period.value = this.calcSavedMoney();
      },
      resetBlock: function(element) {
        element.forEach(function(item, index) {
          if (index !== 0) {
            item.remove();
          }
        });
      },
      addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-title').addEventListener('keypress', appData.onlyText);
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').addEventListener('keypress', appData.onlyNumber);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnAddExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
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
      addIncomeBlock: function() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-title').addEventListener('keypress', appData.onlyText);
        cloneIncomeItem.querySelector('.income-amount').value = '';
        cloneIncomeItem.querySelector('.income-amount').addEventListener('keypress', appData.onlyNumber);
        btnAddIncome.insertAdjacentElement('beforeBegin', cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
          btnAddIncome.style.display = 'none';
        }
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
      changePeriod: function() {
        document.querySelector('.period > .period-amount').textContent = periodSelect.value;
      },
      getExpensesMonth: function () {
        this.expensesMonth = 0;
        for (let key in this.expenses) {
          this.expensesMonth += this.expenses[key];
        }
      },
      getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
      },
      getTargetMonth: function () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
      },
      getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
          return 'У вас высокий уровень дохода';
        } else if (this.budgetDay >= 600) {
          return 'У вас средний уровень дохода';
        } else if (this.budgetDay >= 0) {
          return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
          return 'Что то пошло не так';
        }
      },
      getInfoDeposit: function () {
        if (checkDeposit.checked) {
          let percentDeposit, moneyDeposit;
          do {
            percentDeposit = prompt('Какой годовой процент?','10');
          } while (!isNumber(percentDeposit) || percentDeposit <= 0);
          this.percentDeposit = +percentDeposit;
          do {
            moneyDeposit = prompt('Какая сумма заложена?','10000');
          } while (!isNumber(moneyDeposit) || moneyDeposit <= 0);
          this.moneyDeposit = +moneyDeposit;
        }
      },
      calcSavedMoney: function () {
        return this.budgetMonth * periodSelect.value;
      },
      disabledInputFields: function(state) {
        const fields = document.querySelectorAll('.data input[type="text"]');
        fields.forEach(function(item) {
          item.disabled = !!state;
        });
      },
      blockInputFields: function() {
        this.disabledInputFields(true);
        btnStart.innerText = 'Сбросить';
        btnStart.addEventListener('click', function() {
          appData.reset.apply(appData);
        },{'once': true});
      },
      initValue: function() {
          this.income = {};
          this.addIncome = [];
          this.expenses = {};
          this.addExpenses = [];
          this.percentDeposit = 0;
          this.moneyDeposit = 0;
          this.budget = 0;
          this.budgetDay = 0;
          this.budgetMonth = 0;
          this.expensesMonth = 0;
          this.incomeMonth = 0;
      },
      reset: function() {

        this.resetBlock(incomeItems);
        btnAddIncome.removeAttribute('style');
        this.resetBlock(expensesItems);
        btnAddExpenses.removeAttribute('style');

        const inputTextFields = document.querySelectorAll('input[type="text"]');
        inputTextFields.forEach(function(item) {
          item.value = '';
        });
        this.disabledInputFields(false);

        checkDeposit.checked = false;
        periodSelect.value = 1;
        this.changePeriod();

        btnStart.innerText = 'Рассчитать';
        this.checkSalary();
        btnStart.addEventListener('click', function() {
          appData.start.apply(appData);
        },{'once': true});

        this.initValue();
      }
  };

  allInputs.forEach(function(item) {
    if (item.getAttribute('placeholder') === 'Наименование') {
      item.addEventListener('keypress', appData.onlyText);
    }
    if (item.getAttribute('placeholder') === 'Сумма') {
      item.addEventListener('keypress', appData.onlyNumber);
    }
  });

  btnStart.addEventListener('click', function() {
    appData.start.apply(appData);
  },{'once': true});

  btnAddIncome.addEventListener('click', appData.addIncomeBlock);

  btnAddExpenses.addEventListener('click', appData.addExpensesBlock);

  periodSelect.addEventListener('input', appData.changePeriod);

  salaryAmount.addEventListener('input', appData.checkSalary);
  document.addEventListener('DOMContentLoaded', appData.checkSalary);