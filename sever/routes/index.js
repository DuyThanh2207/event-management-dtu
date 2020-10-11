var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'emd'
});

/* GET home page. */
router.get('/account', (req, res) => {
    connection.query('SELECT * FROM account where account_role not in ("Admin")', (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/create-user', (req, res) => {
    const account_id = req.body.account_id
    const account_name = req.body.account_name
    const account_username = req.body.account_username
    const account_password = req.body.account_password
    const account_email = req.body.account_email
    const account_role = req.body.account_role
    connection.query('INSERT INTO `account` (`account_id`, `account_name`, `account_username`, `account_password`, `account_email`, `account_role`) VALUES (?, ?, ?, ?, ?, ?)', [account_id, account_name, account_username, account_password, account_email, account_role], (err, response) => {
        if (err)
            res.send({ message: "Can't create account" });
        else
            res.send(response);
    });
});
router.post('/edit-user', (req, res) => {
    const account_id = req.body.account_id
    const account_name = req.body.account_name
    const account_username = req.body.account_username
    const account_email = req.body.account_email
    const account_role = req.body.account_role
    connection.query('UPDATE `account` SET `account_name` = ?, `account_username` = ?, `account_email` = ?, `account_role` = ? WHERE (`account_id` = ?)', [account_name, account_username, account_email, account_role, account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't edit account" });
        else
            res.send(response);
    });
});
router.post('/delete-user', (req, res) => {
    const account_id = req.body.account_id
    connection.query('DELETE FROM `account` WHERE (`account_id` = ?)', [account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't delete account" });
        else
            res.send(response);
    });
});
module.exports = router;