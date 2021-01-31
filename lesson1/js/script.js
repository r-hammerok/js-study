const 
  money = 60000,
  income = 'биржа',
  addExpenses = 'Животные, Кофе, Проезд',
  deposit = false,
  mission = 100000,
  period = 12,
  budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);