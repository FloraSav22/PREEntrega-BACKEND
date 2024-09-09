import { Router } from 'express';

const express = require('express');
const router = express.Router();

let products = [];
let productId = 1;

const express = require('express');

router.post('/', (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    const newProduct = {
        id: productId++,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});


router.get('/', (req, res) => {
    res.json(products);
});


router.get('/:pid', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});


router.put('/:pid', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    product.title = title;
    product.description = description;
    product.code = code;
    product.price = price;
    product.status = status;
    product.stock = stock;
    product.category = category;
    product.thumbnails = thumbnails;
    res.json(product);
});


router.delete('/:pid', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.pid));
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    products.splice(productIndex, 1);
    res.status(204).send();
});

export default router;

