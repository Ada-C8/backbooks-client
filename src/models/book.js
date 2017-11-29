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


  // book.save({ title: 'foo' }, {success: () => {} })

  validate(attributes) {
    // Note the argument. We will read attribute values from
    // here instead of calling this.get()

    // Format of errors: same as Rails!
    // {
    //   title: ['cannot be blank', 'already taken'],
    //   author: ['cannot be blank']
    // }

    const errors = {};
    if (!attributes.title) {
      errors.title = ['cannot be blank'];
    }

    if (!attributes.author) {
      errors.author = ['cannot be blank'];
    }

    if (!attributes.publication_year) {
      errors.publication_year = ['cannot be blank'];
    } else if (attributes.publication_year < 1000 ||
      attributes.publication_year > (new Date()).getFullYear()) {
      errors.publication_year = ['must be between 1000 and the current year'];
    }

    if (Object.keys(errors).length < 1) {
      return false;
    }
    return errors;
  },



  age() {
    return (new Date()).getFullYear() - this.get('publication_year');
  },
  toString() {
    return `<Book ${ this.get('title') }>`;
  },

});

export default Book;
