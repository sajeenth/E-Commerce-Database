const express = require('express');
const cors = require('cors');

const app = express()
const mysql = require('mysql');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "ecomdb"
});

app.post('/create', (req, res) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const password = req.body.password;
    const date = req.body.date;
    db.query('INSERT INTO users (id, firstName, lastName, userName, password, birthDate) VALUES (?, ?, ?, ?, ?, ?)', [id, firstName, lastName, userName, password, date], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error")
        } else {
            res.send("Success")
        }
    })
})

app.post('/buy', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const coupon = req.body.coupon;
    const address = req.body.address;
    const userID = req.body.userID;

    db.query('INSERT INTO product (name, price, coupon, address, userID) VALUES (?, ?, ?, ?, ?)', [name, price, coupon, address, userID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Success")
        }
    })
})

app.post('/delete', (req, res) => {
    const user = req.body.userName;
    db.query('DELETE FROM users WHERE userName = (?)', [user], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Success")
        }
    })
})

app.post('/reset', (req, res) => {
    db.query('DELETE FROM users', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            db.query('DELETE FROM product', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Success")
                }
            })
        }
    })
})

app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

app.post('/prod', (req, res) => {
    const userID = req.body.userID;
    db.query("SELECT * FROM product WHERE userID = (?)", [userID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

app.post('/verify', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;    
    db.query("SELECT * FROM users WHERE userName = (?)",[userName], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})


app.get('/count', (req, res) => {
    db.query('SELECT COUNT(*) FROM users', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})