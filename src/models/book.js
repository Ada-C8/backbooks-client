import Backbone from 'backbone';

const Book = Backbone.Model.extend({
  defaults: {
    author: 'Unknown'
  },

  // None of these are very useful to us for this project
  // initialize(attributes) {
  //   console.log(`Book initialized with title ${ this.get('title')} and author ${this.get('author')}`);
  //
  //   console.log(attributes);
  // },
  //
  // parse(serverData) {
  //   // turn serverData into something Backbone can consume
  // },
  //
  // toJSON() {
  //
  // },



  age() {
    return (new Date()).getFullYear() - this.get('publication_year');
  },
  toString() {
    return `<Book ${ this.get('title') }>`;
  },

});

export default Book;
