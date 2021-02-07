'use strict';
const mainStr = 'sssssssssssssssssssssssssssssss';

const modifyString = function(str) {
    if (typeof str !== 'string') {
        return 'Передана НЕ строка!';
    }
    str = str.trim();
    if (str.length > 30) {
        str = str.substring(0, 30) + '...';
    }
    return str;
};

console.log(modifyString(mainStr));