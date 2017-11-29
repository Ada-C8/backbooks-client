import Backbone from 'backbone';


const Book = Backbone.Model.extend({
  defaults: {
    author: "N/A",
  },
  initialize: function(attributes) {
    // console.log(`In initialize: for the book ${ this.get('title') }`);
  },
  validate: function(attributes) {
    // console.log("What are the attributes in validate()?");
    // console.log(attributes);
    const errors = {};

    if (!attributes.title) {
      errors['title'] = ["Title cannot be blank"];
    }

    if (!attributes.author) {
      errors['author'] = ["Author cannot be blank"];
    }

    if (!attributes.publication_year) {
      errors['publication_year'] = ["Publication Year cannot be blank"];
    }

    // Not necessarily the best validations. Please reconsider your validations :)
    // Doesn't parseInt get rid of characters that are non-digits?
    // Don't these errors just override each other?
    if ( isNaN( attributes.publication_year ) ) {
      errors['publication_year'] = ["Publication Year must be a number"];
    } else if ( parseInt(attributes.publication_year) < 1001 || parseInt(attributes.publication_year) > 2018 ) {
      errors['publication_year'] = ["Publication Year must be a valid year"];
    }

    // console.log("What are the errors?");
    // console.log(errors);

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
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
