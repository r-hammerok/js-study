let money, 
income,
addExpenses,
deposit,
mission,
period;

money = 60000;
income = 'биржа';
addExpenses = 'Животные, Кофе, Проезд';
deposit = false;
mission = 100000;
period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
let budgetDay = money / 30;
console.log(budgetDay);
