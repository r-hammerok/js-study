'use strict';
const mainStr = 'sssssssssssssssssssssssssssssss';

const modifyString = function(str) {
    if (typeof str !== 'string') {
        return false;
    }
    str = str.trim();
    if (str.length > 30) {
        str = str.substring(0, 30) + '...';
    }
    return str;
};

const modStr = modifyString(mainStr);

if (!modStr) {
    console.log('Передана НЕ строка!');
} else {
    console.log(modStr);
}