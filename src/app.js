const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRouter = require('./routes/products.router');
app.use('/api/products', productsRouter);


app.get('/', (req, res) => {
    res.render('home', { products: getProducts() });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products: getProducts() });
});


const getProducts = () => {
    const fs = require('fs');
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/products.json'), ));
    return products;
};


io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.emit('updateProducts', getProducts());

    socket.on('newProduct', () => {
        io.emit('updateProducts', getProducts());
    });

    socket.on('deleteProduct', () => {
        io.emit('updateProducts', getProducts());
    });
});


const port = 8080;
server.listen(port, () => {
    console.log(`Escuchando al puerto http://localhost:${port}`);
});
