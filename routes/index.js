var express = require('express');
var router = express.Router();
var Product = require('../models/product');


/* GET home page. */
router.get('/', function(req, res, next) {
  var product = Product.find(function(err, doc) {
    var ChunkArray = [];
    var ChunkSize = 3;
    for (var i=0; i < doc.length ; i += ChunkSize) {
      ChunkArray.push(doc.slice(i, i + ChunkSize));
    }
    res.render('index', { title: 'Shopping Website', products: ChunkArray });
  });

});



module.exports = router;
