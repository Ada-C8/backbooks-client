import Backbone from 'backbone';
import Book from '../models/book';

const BookList = Backbone.Collection.extend({
  model: Book,
  url: 'http://localhost:3000/books',

  // we need to override parse b/c our API returns
  // data in a weird format
  parse: function(response) {
    return response["books"];
  },



  comparator: 'title',
});

export default BookList;
