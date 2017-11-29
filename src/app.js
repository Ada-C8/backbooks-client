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

const bookList = new BookList();
bookList.add(codingInterview);

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
    book.save({}, {
      success: events.successfullSave,
      error: events.failedSave,
    });
  },
  sortBooks(event) {
    // remove current-sort-field from the class
    // list of any element that has it.
    $('.current-sort-field').removeClass('current-sort-field');
    // Add the class to the current selected element
    $(this).addClass('current-sort-field');
    // Get the class list of the selected element
    const classes = $(this).attr('class').split(/\s+/);

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
  },
  successfullSave(book, response) {
    console.log('Success!');
    console.log(book);
    console.log(response);
    $('#status-messages ul').empty();
    $('#status-messages ul').append(`<li>${book.get('title')} added!</li>`);
    $('#status-messages').show();
  },
  failedSave(book, response) {
    console.log('ERROR!');
    console.log(book);
    console.log(response);
    $('#status-messages ul').empty();
    console.log(response.responseJSON.errors);
    for(let key in response.responseJSON.errors) {
      response.responseJSON.errors[key].forEach((error) => {
        $('#status-messages ul').append(`<li>${key}:  ${error}</li>`);
      })
    }
    $('#status-messages').show();
    book.destroy();

  },
};


$(document).ready(() => {
  bookTemplate = _.template($('#book-template').html());
  $('#add-book-form').submit(events.addBook);
  $('.sort').click(events.sortBooks);
  bookList.on('update', render, bookList);
  bookList.on('sort', render, bookList);

  bookList.fetch();
});
