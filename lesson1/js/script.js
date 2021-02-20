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
  incomeItems = document.querySelectorAll('.income-items');


class AppBudget {
  constructor() {
    this.initValue();
  }

  checkSalary() {
    btnStart.disabled = !isNumber(salaryAmount.value);
  }
  onlyText(e) {
    if (e.charCode !== 32 && e.charCode !== 44 && e.charCode !== 46 && 
          e.charCode !== 1025 && e.charCode !== 1105 && 
             (e.charCode < 1040 || e.charCode > 1103)) {
      e.preventDefault();
    }
  }
  onlyNumber(e) {
    if (e.charCode < 48 || e.charCode > 57 ) {
      e.preventDefault();
    }
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getIncExp();
    this.getInfoDeposit();
    this.getExpensesMonth();
    this.getAddIncExp();
    
    this.getBudget();
  
    this.showResult();
  
    this.blockInputFields();
  }

  showResult() {
    periodSelect.addEventListener('change', () => { period.value = this.calcSavedMoney(); });
  
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = this.budgetDay;
    expensesMonth.value = this.expensesMonth;
    addIncomeValue.value = this.addIncome.join(', ');
    addExpensesValue.value = this.addExpenses.join(', ');
    targetMonth.value = this.getTargetMonth();
    period.value = this.calcSavedMoney();
  }

  resetBlock(element) {
    element.forEach((item, index) => {
      if (index !== 0) {
        item.remove();
      }
    });
  }

  addIncExpBlock(event) {
    const targetType = event.target.className.split(' ')[1].split('_')[0];
    const elements = document.querySelectorAll(`.${targetType}-items`);
    const newItem = elements[0].cloneNode(true);

    newItem.querySelector(`.${targetType}-title`).value = '';
    newItem.querySelector(`.${targetType}-title`).addEventListener('keypress', this.onlyText);
    newItem.querySelector(`.${targetType}-amount`).value = '';
    newItem.querySelector(`.${targetType}-amount`).addEventListener('keypress', this.onlyNumber);
    event.target.insertAdjacentElement('beforeBegin', newItem);

    if (elements.length === 2) {
      event.target.style.display = 'none';
    }
  }

  getIncExp() {
    const count = (item) => {
      const
        startStr = item.className.split('-')[0],
        itemTitle = item.querySelector(`.${startStr}-title`).value,
        itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = +itemAmount;
        this.incomeMonth += +itemAmount;
      }
    };
    incomeItems.forEach(count);
    expensesItems.forEach(count);
  }

  getAddIncExp() {
    const addExpenses = addExpensesItem.value.split(',');
    const addIncomes = Array.from(additionalIncome, item => item.value.trim());

    this.addIncome = addIncomes.filter( (item) => item !== '' );
    this.addExpenses = addExpenses.filter( (item) => item !== '' );
  }

  changePeriod() {
    document.querySelector('.period > .period-amount').textContent = periodSelect.value;
  }

  getExpensesMonth() {
    this.expensesMonth = 0;
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так';
    }
  }

  getInfoDeposit() {
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
  }

  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  disabledInputFields(state) {
    const fields = document.querySelectorAll('.data input[type="text"]');
    fields.forEach((item) => {
      item.disabled = !!state;
    });
  }

  blockInputFields() {
    this.disabledInputFields(true);
    btnStart.innerText = 'Сбросить';
    btnStart.addEventListener('click', this.reset.bind(this), {'once': true});
  }

  initValue() {
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
  }

  reset() {
    this.resetBlock(incomeItems);
    btnAddIncome.removeAttribute('style');
    this.resetBlock(expensesItems);
    btnAddExpenses.removeAttribute('style');
  
    const inputTextFields = document.querySelectorAll('input[type="text"]');
    inputTextFields.forEach((item) => {
      item.value = '';
    });
    this.disabledInputFields(false);
  
    checkDeposit.checked = false;
    periodSelect.value = 1;
    this.changePeriod();
  
    btnStart.innerText = 'Рассчитать';
    this.checkSalary();
    
    btnStart.addEventListener('click', this.start.bind(this), {'once': true});
    this.initValue();
  }

  eventsListeners() {
    allInputs.forEach((item) => {
      if (item.getAttribute('placeholder') === 'Наименование') {
        item.addEventListener('keypress', this.onlyText);
      }
      if (item.getAttribute('placeholder') === 'Сумма') {
        item.addEventListener('keypress', this.onlyNumber);
      }
    });
    btnStart.addEventListener('click', this.start.bind(this), {'once': true});
    btnAddIncome.addEventListener('click', this.addIncExpBlock.bind(this));
    btnAddExpenses.addEventListener('click', this.addIncExpBlock.bind(this));
    periodSelect.addEventListener('input', this.changePeriod);
    salaryAmount.addEventListener('input', this.checkSalary);
    document.addEventListener('DOMContentLoaded', this.checkSalary);
  }
}

const mainBudget = new AppBudget();

mainBudget.eventsListeners();