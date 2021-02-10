'use strict';

const getHourByString = function(hour) {
    const suffix = hour % 10;
    if (suffix === 1 && hour !== 11) {
        return 'час';
    }
    if (suffix >= 2 && suffix <= 4 && (hour <= 9 || hour >= 22)) {
        return 'часа';
    }
    return 'часов';
};

const getSecondByString = function(second) {
    const suffix = second % 10;
    if (suffix === 1 && second !== 11) {
        return 'секунда';
    }
    if (suffix >= 2 && suffix <= 4 && (second <=9 || second >= 22)) {
        return 'секунды';
    }
    return 'секунд';
};



