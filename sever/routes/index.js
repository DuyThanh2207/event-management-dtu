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
router.get('/event', (req, res) => {
    connection.query('SELECT * FROM event_emd', (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}
today = dd + '/' + mm + '/' + yyyy;
router.get('/event-live', (req, res) => {
    connection.query('SELECT * FROM emd.event_emd where event_date = ?', [today], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.get('/event-past', (req, res) => {
    connection.query('SELECT * FROM emd.event_emd where event_date < ?', [today], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/login', (req, res) => {
    const account_username = req.body.account_username
    const account_password = req.body.account_password
    connection.query(
        'SELECT * FROM account where account_username = ? and account_password = ?', [account_username, account_password],
        (error, results) => {
            if (error)
                res.send({ message: "Wrong username / password !" })
            if (results.length > 0) {
                res.send(results)
            } else
                res.send({ message: "Wrong username / password !" });
        });
});
router.post('/change-password', (req, res) => {
    const new_password = req.body.new_password
    const old_password = req.body.old_password
    const account_id = req.body.account_id
    connection.query(
        'SELECT * FROM account where account_id = ? and account_password = ?', [account_id, old_password],
        (error, results) => {
            if (error)
                res.send({ message: "Old password is not correct" })
            if (results.length > 0) {
                connection.query(
                    'UPDATE account SET account_password = ? where account_id = ?', [new_password, account_id],
                    (error, results) => {
                        if (error)
                            res.send({ message: "Can't update your account" })
                        else
                            res.send(results)
                    })
            } else
                res.send({ message: "Old password is not correct" });
        });
});
module.exports = router;