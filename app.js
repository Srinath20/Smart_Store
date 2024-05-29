const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/items');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/items', itemsRoutes);

app.listen(3010, () => {
    console.log('Server is running on port 3010');
});
