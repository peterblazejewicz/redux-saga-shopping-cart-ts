# redux-saga-shopping-cart-ts

client+server for redux saga shopping cart by Daniel Stern

## Client

TBD

## Server

Backing API built on Node.js

```ts
app.use('/api', api);
```

```ts
// middlewares

api.use(
  ['/card/validate/:owner', '/card/charge/:owner'],
  validateCardOwnerMiddleware
);
api.use(
  ['/cart/validate/:owner', '/cart/:owner', '/card/charge/:owner'],
  validateCartOwnerMiddleware
);

// user
api.get('/user/:id', usersController.findById);

// taxes
api.get('/tax/:symbol', taxesController.findBySymbol);

// card
api.get('/card/charge/:owner', cardsController.chargeOwner);

// cart
api.get('/cart/validate/:owner', cartsController.checkAvailableQuantity);
api.get('/cart/:owner', cartsController.getCartForOwner);
api.get('/cart/add/:owner/:itemID', cartsController.addItemToCart);
api.get('/cart/remove/:owner/:itemID', cartsController.removeItemFromCart);
```

## Author

@peterblazejewicz
