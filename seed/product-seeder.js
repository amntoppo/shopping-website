var Product = require('../models/product');

var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/shopping', {
  useMongoClient: true
});

var products = [
  new Product({
  imagePath: 'https://i.ytimg.com/vi/3YJpUROvQAk/maxresdefault.jpg',
  title: 'Any title',
  description: 'Awesome product',
  price: 12
}),

  new Product({
  imagePath: 'https://i.ytimg.com/vi/3YJpUROvQAk/maxresdefault.jpg',
  title: 'Another Title',
  description: 'Awesome product',
  price: 12
}),
  new Product({
  imagePath: 'https://i.ytimg.com/vi/3YJpUROvQAk/maxresdefault.jpg',
  title: 'Any Another',
  description: 'Awesome product',
  price: 12
}),
  new Product({
  imagePath: 'https://i.ytimg.com/vi/3YJpUROvQAk/maxresdefault.jpg',
  title: 'Any Title',
  description: 'Awesome product',
  price: 12
}),
  new Product({
  imagePath: 'https://i.ytimg.com/vi/3YJpUROvQAk/maxresdefault.jpg',
  title: 'TItle another',
  description: 'Awesome product',
  price: 12
}),
  new Product({
  imagePath: 'https://i.ytimg.com/vi/3YJpUROvQAk/maxresdefault.jpg',
  title: 'Any title',
  description: 'Awesome product',
  price: 12
})
];


//to disconnect AFTER finishing the seeding
var done=0;
for(var i=0; i < products.length; i++) {
  products[i].save(function(error, result) {
    done++;
      if(done==products.lenth) {
        exit();
      }
  });
}

function exit() {
  mongoose.disconnect();
}
