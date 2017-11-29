import Backbone from 'backbone';


const Book = Backbone.Model.extend({
  defaults: {
    author: "N/A",
  },
  initialize: function(attributes) {
    // console.log(`In initialize: for the book ${ this.get('title') }`);
  },
  age: function() {
    const currentYear = (new Date()).getFullYear();
    return currentYear - this.get('publication_year');
  },
  toString: function() {
    return `This is: ${this.get('title')} by ${this.get('author')}`;
  },
});

export default Book;
