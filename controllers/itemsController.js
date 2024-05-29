const db = require('../db');

exports.addItem = (req, res) => {
    const { name, description, price, quantity } = req.body;
    if (!name || !description || !price || !quantity) {
        return res.status(400).send('All fields are required.');
    }
    const query = 'INSERT INTO items (name, description, price, quantity) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, price, quantity], (err, result) => {
        if (err) throw err;
        res.status(200).send('Item added successfully.');
    });
};

exports.getItems = (req, res) => {
    const query = 'SELECT * FROM items';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.buyItem = (req, res) => {
    const { id, quantity } = req.params;
    const query = 'UPDATE items SET quantity = quantity - ? WHERE id = ? AND quantity >= ?';
    db.query(query, [quantity, id, quantity], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(400).send('Not enough quantity or item not found.');
        }
        res.status(200).send('Item bought successfully.');
    });
};
