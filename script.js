'use strict';

const 
    getHourByString = function(hour) {
        hour = hour % 100;
        const suffix = hour % 10;
        if (suffix === 1 && hour !== 11) {
            return 'час';
        }
        if (suffix >= 2 && suffix <= 4 && (hour <= 9 || hour >= 22)) {
            return 'часа';
        }
        return 'часов';
    },
    getSecondByString = function(second) {
        second = second % 100;
        const suffix = second % 10;
        if (suffix === 1 && second !== 11) {
            return 'секунда';
        }
        if (suffix >= 2 && suffix <= 4 && (second <=9 || second >= 22)) {
            return 'секунды';
        }
        return 'секунд';
    },
    getNumberByString = function(n) {
        return n < 10 ? '0' + String(n) : String(n);
    }

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
    getFullDate1 = function() {
        const now = new Date();
        return 'Сегодня ' + dayRu[now.getDay()] + ', ' + now.getDate() + ' ' + 
            monthRu[now.getMonth()-1] + ' ' + now.getFullYear() + ' года, ' + 
            now.getHours() + ' ' + getHourByString(now.getHours()) + ' ' + 
            now.getMinutes() + ' минут ' + now.getSeconds() + ' ' + 
            getSecondByString(now.getSeconds());
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