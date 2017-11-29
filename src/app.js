// Import the CSS
import 'foundation-sites/dist/css/foundation.css';
import './style.css';

// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// Our components
import BookList from './collections/book_list';

const BOOK_FIELDS = ['title', 'author', 'publication_year'];

const bookList = new BookList();

// Starts undefined - we'll set this in $(document).ready
// once we know the template is available
let bookTemplate;

// Clear status messages
const clearStatus = function clearStatus() {
  $('#status-messages ul').html('');
  $('#status-messages').hide();
};

// Add a new status message
const reportStatus = function reportStatus(status, message) {
  console.log(`Reporting ${ status } status: ${ message }`);

  // Should probably use an Underscore template here.
  const statusHTML = `<li class="${ status }">${ message }</li>`;

  // note the symetry with clearStatus()
  $('#status-messages ul').append(statusHTML);
  $('#status-messages').show();
};

const render = function render(bookList) {
  // iterate through the bookList, generate HTML
  // for each model and attatch it to the DOM
  const bookTableElement = $('#book-list');
  bookTableElement.html('');

  bookList.forEach((book) => {
    const generatedHTML = bookTemplate(book.attributes);
    bookTableElement.append(generatedHTML);
  });

  // Provide visual feedback for sorting
  $('th.sort').removeClass('current-sort-field');
  $(`th.sort.${ bookList.comparator }`).addClass('current-sort-field');
};

const readFormData = function readFormData() {
  const bookData = {};
  BOOK_FIELDS.forEach((field) => {
    // select the input corresponding to the field we want
    const inputElement = $(`#add-book-form input[name="${ field }"]`);
    const value = inputElement.val();

    // Don't take empty strings, so that Backbone can
    // fill in default values
    if (value != '') {
      bookData[field] = value;
    }

    inputElement.val('');
  });

  console.log("Read book data");
  console.log(bookData);

  return bookData;
};

const handleValidationFailures = function handleValidationFailures(errors) {
  // Since these errors come from a Rails server, the strucutre of our
  // error handling looks very similar to what we did in Rails.
  for (let field in errors) {
    for (let problem of errors[field]) {
      reportStatus('error', `${field}: ${problem}`);
    }
  }
};

const addBookHandler = function(event) {
  event.preventDefault();

  const book = bookList.add(readFormData());

  // The first argument to .save is the attributes to save.
  // If we leave it blank, it will save all the attributes!
  // (Think of model.update in Rails, where it updates the
  // model and saves to the DB in one step). We need the second
  // argument for callbacks, so we pass in {} for the first.
  book.save({}, {
    success: (model, response) => {
      console.log('Successfully saved book!');
      reportStatus('success', 'Successfully saved book!');
    },
    error: (model, response) => {
      console.log('Failed to save book! Server response:');
      console.log(response);

      // Server-side validations failed, so remove this bad
      // book from the list
      bookList.remove(model);

      handleValidationFailures(response.responseJSON["errors"]);
    },
  });
};

$(document).ready(() => {
  bookTemplate = _.template($('#book-template').html());

  console.log(`About to fetch data from ${ bookList.url }`);

  // Register our update listener first, to avoid the race condition
  bookList.on('update', render);
  bookList.on('sort', render);

  // When fetch gets back from the API call, it will add books
  // to the list and then trigger an 'update' event
  bookList.fetch();

  // Listen for when the user adds a book
  $('#add-book-form').on('submit', addBookHandler);

  // Add a click handler for each of the table headers
  // to sort the table by that column
  BOOK_FIELDS.forEach((field) => {
    const headerElement = $(`th.sort.${ field }`);
    headerElement.on('click', (event) => {
      console.log(`Sorting table by ${ field }`);
      bookList.comparator = field;
      bookList.sort();
    });
  });

  $('#status-messages button.clear').on('click', clearStatus);
});
