// Define a CatList collection

// src/collections/cat_list.js
import Backbone from 'backbone';
import Cat from '../models/cat';

const CatList = Backbone.Collection.extend({
  model: Cat
});

export default CatList;

// Instantiate your CatList with two cats

// src/app.js
import CatList from './collections/cat_list';

const cl = new CatList([
  {
    name: 'larry',
  }, {
    name: 'barry',
  }
]);

// Add a cat to the list

cl.add({
  name: 'fig'
});
