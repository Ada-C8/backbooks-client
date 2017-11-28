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
bookList.on('bogus', bogusListener);

// 3.  Trigger the event
bookList.trigger('bogus', 'Argument!');

const fields = ['title', 'author', 'publication_year'];

const events = {
  addBook(event) {
    event.preventDefault();
    const bookData = {};
    fields.forEach( (field) => {
      bookData[field] = $(`input[name=${field}]`).val();
    });
    console.log('Book Added');
    console.log(bookData);
    const book = new Book(bookData);
    bookList.add(book);
  },
  sortBooks(event) {
    $('.current-sort-field').removeClass('current-sort-field');
    const classes = $(this).attr('class').split(/\s+/);

    $(this).addClass('current-sort-field');
    classes.forEach((className) => {
      if (fields.includes(className)) {
        if (className === bookList.comparator) {
          bookList.models.reverse();
          bookList.trigger('sort', bookList);
        }
        else {
          bookList.comparator = className;
          bookList.sort();
        }
      }
    });
    // 1.  Fix the styling
    // 2.  Work on the reverse scenario

  },
};


$(document).ready(() => {
  bookTemplate = _.template($('#book-template').html());
  $('#add-book-form').submit(events.addBook);
  $('.sort').click(events.sortBooks);
  bookList.on('update', render, bookList);
  bookList.on('sort', render, bookList);

  render(bookList);





});
