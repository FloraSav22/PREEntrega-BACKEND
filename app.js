const express = require('express');

const app = express();


const port = 8080;
app.listen(8080, () => {
    console.log("Escuchando al Puerto 8080");
})

app.use(express.json());

app.use(express.json());

const productsRouter = require('./products.router.js');
app.use('/api/products', productsRouter);

const cartsRouter = require('./carts.router.js');
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});