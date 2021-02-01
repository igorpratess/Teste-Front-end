const express = require('express');
const app = express();

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/front-end/public'));

const productsRoute = require('./routes/products');
const newsletterRoute = require('./routes/newsletter');

app.use('/products', productsRoute);
app.use('/newsletter', newsletterRoute);
app.get('/', (req, res) => {
    res.render('index.html');
});

module.exports = app;