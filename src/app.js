// Import the CSS
import 'foundation-sites/dist/css/foundation.css';
import './style.css';

// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// Our components
import BookList from './collections/book_list';

const BOOK_FIELDS = ['title', 'author', 'publication_year'];
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

// Starts undefined - we'll set this in $(document).ready
// once we know the template is available
let bookTemplate;

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

const addBookHandler = function(event) {
  event.preventDefault();

  const bookData = {};
  BOOK_FIELDS.forEach((field) => {
    // select the input corresponding to the field we want
    const inputElement = $(`#add-book-form input[name="${ field }"]`);
    const value = inputElement.val();
    bookData[field] = value;

    inputElement.val('');
  });

  console.log("Read book data");
  console.log(bookData);

  bookList.add(bookData);
};

$(document).ready(() => {
  bookTemplate = _.template($('#book-template').html());

  render(bookList);

  bookList.on('update', render);
  bookList.on('sort', render);

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

});
