// Import the CSS
import 'foundation-sites/dist/css/foundation.css';
import './style.css';

// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// Our components
import Book from 'models/book';

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

// Starts undefined - we'll set this in $(document).ready
// once we know the template is available
let bookTemplate;

const render = function render(bookList) {

};

$(document).ready(() => {
  bookTemplate = _.template($('#book-template').html());
});
