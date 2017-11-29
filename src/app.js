// app.js
import $ from 'jquery';
import _ from 'underscore';

import 'foundation-sites/dist/css/foundation.css';
import './style.css';

import Book from './models/book';
import BookList from './collections/book_list';


const bookList = new BookList();
let bookTemplate;

const render = function render(bookList) {

  // Get the element to append to
  const $bookList = $('#book-list');
  $bookList.empty();

  bookList.forEach((book) => {
    $bookList.append(bookTemplate(book.attributes));
  });
};

// Listening for a Backbone Event

// 1.  Create an Event Listener
// const bogusListener = function bogusListener(event)  {
//   console.log('Event Occured!');
// };

// 2.  Register the Event Handler with the Component
// bookList.on('bogus', bogusListener);

// 3.  Trigger the event
// bookList.trigger('bogus', 'Argument!');

const fields = ['title', 'author', 'publication_year'];

const events = {
  addBook(event) {
    event.preventDefault();
    const bookData = {};
    fields.forEach( (field) => {
      bookData[field] = $(`input[name=${field}]`).val();
    });
    const book = new Book(bookData);
    bookList.add(book);
    book.save({}, {
      success: events.successfullSave,
      error: events.failedSave,
    });
  },
  sortBooks(event) {
    $('.current-sort-field').removeClass('current-sort-field');
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
    $('#status-messages ul').empty();
    $('#status-messages ul').append(`<li>${book.get('title')} added!</li>`);
    $('#status-messages').show();
  },
  failedSave(book, response) {
    $('#status-messages ul').empty();
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
