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

// codingInterview.set('title', 'The Lord of the Flies');
// console.log(`Title is ${codingInterview.get('title')}`);
//
//
// console.log(codingInterview);

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

// Listening for a Backbone Event

// 1.  Create an Event Listener

const bogusListener = function bogusListener(event)  {
  console.log('Event Occured!');
  console.log(event);
  console.log(this);
};

// 2.  Register the Event Handler with the Component
bookList.on('bogus', bogusListener,  bookList);

// 3.  Trigger the event
bookList.trigger('bogus', 'Argument!');


$(document).ready(() => {
  bookTemplate = _.template($('#book-template').html());

    render(bookList);





});
