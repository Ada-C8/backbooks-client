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

const updateStatusMessageFrom = (messageHash) => {
  $('#status-messages ul').empty();
  for(let messageType in messageHash) {
    messageHash[messageType].forEach((message) => {
      $('#status-messages ul').append($(`<li>${messageType}:  ${message}</li>`));
      console.log(`<li>${messageType}:  ${message}</li>`);
    })
  }
  $('#status-messages').show();
}

const updateStatusMessageWith = (message) => {
  $('#status-messages ul').empty();
  $('#status-messages ul').append(`<li>${message}</li>`);
  $('#status-messages').show();
}

const events = {
  addBook(event) {
    event.preventDefault();
    const bookData = {};
    fields.forEach( (field) => {
      const val = $(`input[name=${field}]`).val();
      if (val != '') {
        bookData[field] = val;
      }
    });
    const book = new Book(bookData);

    if (book.isValid()) {
      bookList.add(book);
      book.save({}, {
        success: events.successfullSave,
        error: events.failedSave,
      });
    } else {
      // getting here means there were client-side validation errors reported
      // console.log("What's on book in an invalid book?");
      // console.log(book);
      updateStatusMessageFrom(book.validationError);
    }

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
    updateStatusMessageWith(`${book.get('title')} added!`)
  },
  failedSave(book, response) {
    updateStatusMessageFrom(response.responseJSON.errors);
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
