// Import the CSS
import 'foundation-sites/dist/css/foundation.css';
import './style.css';

// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// Our components
import BookList from './collections/book_list';

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
};

$(document).ready(() => {
  bookTemplate = _.template($('#book-template').html());

  render(bookList);

  const book = bookList.add({
    title: 'Ancillary Justice',
    author: 'Ann Leckie',
    publication_year: 2013,
    page_count: 12334
  });

  render(bookList);

  //
  // console.log(bookList);
  //

  //
  // // bookList.remove(book);
  //
  // bookList.forEach((book) => {
  //   console.log(`${ book.get('title') } by ${ book.get('author') }`);
  // });
  //
  // // look for books where the author name includes the letter 'a'
  // const subList = bookList.select((book) => {
  //   return book.get('author').includes('a')
  // });
  // console.log(subList);
});
