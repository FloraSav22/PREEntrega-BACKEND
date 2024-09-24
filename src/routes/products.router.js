const { Router } = require('express');  

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const productsFilePath = path.join(__dirname, '../data/products.json');


const readProductsFromFile = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};


const writeProductsToFile = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

router.post('/', (req, res) => {
    const products = readProductsFromFile();
    const newProduct = {
        id: products.length + 1,
        ...req.body
    };
    products.push(newProduct);
    writeProductsToFile(products);

    res.status(201).json(newProduct);
});


router.delete('/:pid', (req, res) => {
    const products = readProductsFromFile();
    const pid = parseInt(req.params.pid);
    const updatedProducts = products.filter(p => p.id !== pid);
    
    if (updatedProducts.length === products.length) {
        return res.status(404).send('Producto no encontrado');
    }

    writeProductsToFile(updatedProducts);

    req.app.get('socketio').emit('deleteProduct');

    res.status(200).send('Producto eliminado');
});

router.get('/', (req, res) => {
    res.send('Lista de productos');
});

module.exports = router;

