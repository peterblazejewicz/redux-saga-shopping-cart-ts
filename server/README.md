# Server

The server side implementation for the project

## API

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

// card
api.get('/card/charge/:owner', cardsController.chargeOwner);

// cart
api.get('/cart/validate/:owner', cartsController.checkAvailableQuantity);
api.get('/cart/:owner', cartsController.getCartForOwner);
api.get('/cart/add/:owner/:itemID', cartsController.addItemToCart);
api.get('/cart/remove/:owner/:itemID', cartsController.removeItemFromCart);

// items
api.get('/items/:ids', itemsController.getItemsByIds);
api.get('/prices/:symbol/:ids', itemsController.getPriceForItems);
api.get('/shipping/:items', itemsController.getShippingRatesForItems);

// taxes
api.get('/tax/:symbol', taxesController.findBySymbol);

// user
api.get('/user/:id', usersController.findById);
```

## Author

@peterblazejewicz
