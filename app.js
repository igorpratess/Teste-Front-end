const express = require('express');
const app = express();

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/front-end/public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

module.exports = app;