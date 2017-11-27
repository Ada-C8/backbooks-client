// app.js
import $ from 'jquery';
import _ from 'underscore';

import 'foundation-sites/dist/css/foundation.css';
import './style.css';

import Book from './models/book';
import BookList from './collections/book_list';



const codingInterview = new Book({
  title: 'Cracking the Coding Interview',
  author: 'Gale',
  publication_year: 2011,
  illustrator: 'Bob Ross',
});

codingInterview.set('title', 'The Lord of the Flies');
console.log(`Title is ${codingInterview.get('title')}`);


console.log(codingInterview);

const rawBookData = [
  {
    title: 'Practical Object-Oriented Design in Ruby',
    author: 'Sandy Metz',
    publication_year: 2012
  }, {
    title: 'Parable of the Sower',
    author: 'Octavia Butler',
    publication_year: 1993
  }, {
    title: 'A Wizard of Earthsea',
    author: 'Ursula K. Le Guin',
    publication_year: 1969
  }
];

const bookList = new BookList(rawBookData);
bookList.add(codingInterview);

bookList.add({
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  publication_year: 1922,
});

console.log(bookList.at(2).get('title'));
console.log(bookList.get('c2').get('title'));

bookList.forEach((book) => {
  console.log(`${book.get('title')} by ${book.get('author')}`);
});

const newBooks = bookList.filter((book) => book.get('publication_year') > 2000);

newBooks.forEach((book) => {
  console.log(`New Book:  ${book.get('title')} by ${book.get('author')} `);
});

// Starts undefined - we'll set this in $(document).ready
// once we know the template is available
let bookTemplate;

const render = function render(bookList) {

// Get the element to append to
const $bookList = $('#book-list');
$bookList.empty();

// Build a forEach loop of bookList
bookList.forEach((book) => {
  $bookList.append(bookTemplate(book.attributes));
});

// bookList.forEach((book) => {
//   $('#book-list').append(bookTemplate(book.attributes));
// });
  // Append with the template the book to the DOM
};

$(document).ready(() => {
  bookTemplate = _.template($('#book-template').html());

  $('#book-list').append(bookTemplate( {
    title: 'You don\'t know JS',
    author: 'Kyle Simpson',
    publication_year: 2008,
  } ));

  $('#book-list').append(bookTemplate(codingInterview.attributes));

  $('#book-list').append($(bookTemplate(codingInterview.toJSON())));

  render(bookList);





});
