const express = require('express');
const router = express.Router();

let carts = [];
let cartId = 1;

router.post('/', (req, res) => {
    const newCart = {
        id: cartId++,
        products: []
    };
    carts.push(newCart);
    res.status(201).json(newCart);
});


router.get('/:cid', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart.products);
});


router.post('/:cid/product/:pid', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const { productId } = req.params;
    const product = { product: parseInt(req.params.pid), quantity: 1 };

    
    const cartProduct = cart.products.find(p => p.product === product.product);
    if (cartProduct) {
        cartProduct.quantity += 1;
    } else {
        cart.products.push(product);
    }

    res.json(cart);
});

export default router;
