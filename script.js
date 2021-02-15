'use strict';

const 
    getNumberByString = function(n) {
        return n < 10 ? `0${n}` : `${n}`;
    },
    declOfNum = function(n, textForms) {
        n = Math.abs(n) % 100;
        const suffix = n % 10;
        if (suffix === 1 && n !== 11) {
            return textForms[0];
        }
        if (suffix >= 2 && suffix <= 4 && (n <=9 || n >= 22)) {
            return textForms[1];
        }
        return textForms[2];
    };

const 
    monthRu = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ],
    dayRu = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ],
    hourForm = ['час', 'часа', 'часов'],
    secondForm = ['секунда', 'секунды', 'секунд'],

    getFullDate1 = function() {
        const now = new Date();
        return 'Сегодня ' + dayRu[now.getDay()] + ', ' + now.getDate() + ' ' + 
            monthRu[now.getMonth()-1] + ' ' + now.getFullYear() + ' года, ' + 
            now.getHours() + ' ' + declOfNum(now.getHours(), hourForm) + ' ' + 
            now.getMinutes() + ' минут ' + now.getSeconds() + ' ' + 
            declOfNum(now.getSeconds(), secondForm);
    },
    getFullDate2 = function() {
        const now = new Date();
        return getNumberByString(now.getDate()) + '.' + 
            getNumberByString(now.getMonth()+1) + '.' + 
            getNumberByString(now.getFullYear()) + ' - ' +
            getNumberByString(now.getHours()) + ':' +
            getNumberByString(now.getMinutes()) + ':' +
            getNumberByString(now.getSeconds());
    },
    displayDate = function() {
        const
            p1 = document.getElementsByClassName('date-1')[0],
            p2 = document.getElementsByClassName('date-2')[0];
        
        p1.innerHTML = getFullDate1();
        p2.innerHTML = getFullDate2();
    };

setInterval(displayDate, 1000);