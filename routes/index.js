var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');


/* GET home page. */
router.get('/', function(req, res, next) {
  var product = Product.find(function(err, doc) {
    var ChunkArray = [];
    var ChunkSize = 3;
    for (var i=0; i < doc.length ; i += ChunkSize) {
      ChunkArray.push(doc.slice(i, i + ChunkSize));
    }
    res.render('shop/index', { title: 'Shopping Website', products: ChunkArray });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
    console.log('ok');

    Product.findById(id, function(err, result) {
        if (err) {
            res.redirect('/');
        }
        cart.add(result, result.id);
        req.session.cart = cart;
        console.log(cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});

});

module.exports = router;
