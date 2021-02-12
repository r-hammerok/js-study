'use strict';

const 
    books = document.querySelectorAll('.book'),
    parentBooks = document.querySelector('aside.books');

books[3].before(books[4]);
parentBooks.prepend(books[1]);
parentBooks.append(books[2]);

document.querySelector('body').style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

books[4].querySelector('h2').querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

document.querySelector('div.adv').remove();

let chapters = books[0].querySelectorAll('li');

chapters[10].before(chapters[2]);
chapters[9].before(chapters[7]);
chapters[4].before(chapters[8]);
chapters[8].before(chapters[6]);

chapters = books[5].querySelectorAll('li');
chapters[4].after(chapters[2]);
chapters[7].after(chapters[5]);
chapters[1].after(chapters[9]);

const newEl = document.createElement('li');
newEl.textContent = 'Глава 8: За пределами ES6';
chapters = books[2].querySelectorAll('li');
chapters[9].insertAdjacentElement('beforebegin', newEl);

