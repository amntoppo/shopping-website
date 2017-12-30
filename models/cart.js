module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id) {
      var storedItem = this.items[id];
      if(!storedItem) {
          storedItem = this.items[id] = {items: item, quantity: 0, price: 0};
      }
      storedItem.quantity++;
      storedItem.price = storedItem.items.price * storedItem.quantity;
      this.totalQty++;
      this.totalPrice += item.price;
  };
  this.generateArray = function() {
      var array = [];
      for (var id in this.items) {
          array.push(this.items[id]);
      }
      return array;
  };
};