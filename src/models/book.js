import Backbone from 'backbone';


const Book = Backbone.Model.extend({
  defaults: {
    author: "N/A",
  },
  initialize: function(attributes) {
    this.status = 'Surprise';
    console.log(`In initialize: for the book ${ this.get('title') }`);
    console.log(`What is status? ${ this.status }`);
  },
  age: function() {
    const currentYear = (new Date()).getFullYear();
    console.log(`I'm in age. Here's the status: ${this.status}`);
    return currentYear - this.get('publication_year');
  },
  toString: function() {
    return `This is: ${this.get('title')} by ${this.get('author')}`;
  },
});

export default Book;
