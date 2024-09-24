const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const cartsFilePath = path.join(__dirname, '../data/carts.json');

let carts = [];
let cartId = 1;

const readCartsFromFile = () => {
    const data = fs.readFileSync(cartsFilePath, 'utf8');
    return JSON.parse(data);
};

router.post('/', (req, res) => {
    const newCart = {
        id: cartId++,
        products: []
    };
    carts.push(newCart);
    res.status(201).json(newCart);
});

const writeCartsToFile = (carts) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2), 'utf8');
};

router.get('/:cid', (req, res) => {
    const carts = readCartsFromFile();
    const cid = parseInt(req.params.cid);
    const cart = carts.find(c => c.id === cid);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
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

