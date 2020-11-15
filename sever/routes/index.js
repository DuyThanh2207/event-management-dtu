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
    connection.query('SELECT DISTINCT * FROM account where account_role not in ("Admin")', (err, response) => {
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
    connection.query('SELECT DISTINCT account_username, account_email FROM account WHERE account_username = ? or account_email = ?', [account_username, account_email], (err, response) => {
        if (err)
            res.send({ message: "Can't create account" });
        else if (response.length > 0)
            res.send({ message: "Can't create same account username or email" })
        else {
            connection.query('INSERT INTO `account` (`account_id`, `account_name`, `account_username`, `account_password`, `account_email`, `account_role`) VALUES (?, ?, ?, ?, ?, ?)', [account_id, account_name, account_username, account_password, account_email, account_role], (err, response) => {
                if (err)
                    res.send({ message: "Can't create account" });
                else
                    res.send(response);
            });
        }
    });
});
router.post('/edit-user', (req, res) => {
    const account_id = req.body.account_id
    const account_name = req.body.account_name
    const account_username = req.body.account_username
    const account_email = req.body.account_email
    const account_role = req.body.account_role
    connection.query('SELECT DISTINCT account_username, account_email FROM account WHERE account_username = ? and account_id not in (?) or account_email = ? and account_id not in (?)', [account_username, account_id, account_email, account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't create account" });
        else if (response.length > 0)
            res.send({ message: "Can't create same account username or email" })
        else {
            connection.query('UPDATE `account` SET `account_name` = ?, `account_username` = ?, `account_email` = ?, `account_role` = ? WHERE (`account_id` = ?)', [account_name, account_username, account_email, account_role, account_id], (err, response) => {
                if (err)
                    res.send({ message: "Can't edit account" });
                else
                    res.send(response);
            });
        }
    })
})
router.post('/delete-user', (req, res) => {
    const account_id = req.body.account_id
    connection.query('DELETE FROM `account` WHERE (`account_id` = ?)', [account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't delete account" });
        else
            res.send(response);
    });
});
router.post('/event', (req, res) => {
    const datetimeformat = "%d-%m-%Y"
    const timeFormat = "%H:%i:%s"
    connection.query('SELECT DISTINCT event_id, event_name, event_place, DATE_FORMAT(event_date, ?) as event_date, DATE_FORMAT(event_date, ?) as event_time, event_duration, event_description, center_id  FROM emd_event', [datetimeformat, timeFormat], (err, response) => {
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
today = yyyy + '-' + mm + '-' + dd;
router.post('/event-live', (req, res) => {
    const datetime = "%Y-%m-%d"
    const datetimeformat = "%d-%m-%Y"
    const timeFormat = "%H:%i:%s"
    connection.query('SELECT DISTINCT event_id, event_name, event_place, DATE_FORMAT(event_date, ?) as event_date, DATE_FORMAT(event_date, ?) as event_time, event_duration, event_description, center_id  FROM emd_event where DATE_FORMAT(event_date, ?) = ?', [datetimeformat, timeFormat, datetime, today], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/event-future', (req, res) => {
    const datetime = "%Y-%m-%d"
    const datetimeformat = "%d-%m-%Y"
    const timeFormat = "%H:%i:%s"
    connection.query('SELECT DISTINCT event_id, event_name, event_place, DATE_FORMAT(event_date, ?) as event_date, DATE_FORMAT(event_date, ?) as event_time, event_duration, event_description, center_id  FROM emd_event where DATE_FORMAT(event_date, ?) > ?', [datetimeformat, timeFormat, datetime, today], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/event-past', (req, res) => {
    const datetime = "%Y-%m-%d"
    const datetimeformat = "%d-%m-%Y"
    const timeFormat = "%H:%i:%s"
    connection.query('SELECT DISTINCT event_id, event_name, event_place, DATE_FORMAT(event_date, ?) as event_date, DATE_FORMAT(event_date, ?) as event_time, event_duration, event_description, center_id  FROM emd_event where DATE_FORMAT(event_date, ?) < ?', [datetimeformat, timeFormat, datetime, today], (err, response) => {
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
        'SELECT DISTINCT * FROM account where account_username = ? and account_password = ?', [account_username, account_password],
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
        'SELECT DISTINCT * FROM account where account_id = ? and account_password = ?', [account_id, old_password],
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
router.post('/event-center', (req, res) => {
    const datetimeformat = "%d-%m-%Y"
    const account_id = req.body.account_id
    const timeFormat = "%H:%i:%s"
    connection.query('SELECT DISTINCT event_id, event_name, event_place, event_date as time, DATE_FORMAT(event_date, ?) as event_date, DATE_FORMAT(event_date, ?) as event_time, event_duration, event_description, center_id  FROM emd_event where center_id = ?', [datetimeformat, timeFormat, account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/event-live-center', (req, res) => {
    const account_id = req.body.account_id
    const datetime = "%Y-%m-%d"
    const datetimeformat = "%d-%m-%Y"
    const timeFormat = "%H:%i:%s"
    connection.query('SELECT DISTINCT event_id, event_name, event_place, DATE_FORMAT(event_date, ?) as event_date, DATE_FORMAT(event_date, ?) as event_time, event_duration, event_description, center_id  FROM emd_event where DATE_FORMAT(event_date, ?) = ? and center_id = ?', [datetimeformat, timeFormat, datetime, today, account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/event-future-center', (req, res) => {
    const account_id = req.body.account_id
    const datetime = "%Y-%m-%d"
    const datetimeformat = "%d-%m-%Y"
    const timeFormat = "%H:%i:%s"
    connection.query('SELECT DISTINCT event_id, event_name, event_place, DATE_FORMAT(event_date, ?) as event_date, DATE_FORMAT(event_date, ?) as event_time, event_duration, event_description, center_id  FROM emd_event where DATE_FORMAT(event_date, ?) > ? and center_id = ?', [datetimeformat, timeFormat, datetime, today, account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/event-past-center', (req, res) => {
    const account_id = req.body.account_id
    const datetime = "%Y-%m-%d"
    const datetimeformat = "%d-%m-%Y"
    const timeFormat = "%H:%i:%s"
    connection.query('SELECT DISTINCT event_id, event_name, event_place, DATE_FORMAT(event_date, ?) as event_date, DATE_FORMAT(event_date, ?) as event_time, event_duration, event_description, center_id  FROM emd_event where DATE_FORMAT(event_date, ?) < ? and center_id = ?', [datetimeformat, timeFormat, datetime, today, account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/member', (req, res) => {
    const account_id = req.body.account_id
    connection.query('SELECT DISTINCT account_id, account_name, account_email FROM account a, assignment b where a.account_id = b.staff_id and b.center_id = ?', [account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show member" });
        else
            res.send(response);
    });
});
router.get('/member-all', (req, res) => {
    connection.query('SELECT DISTINCT account_id, account_name FROM allstaff where center_id is null', (err, response) => {
        if (err)
            res.send({ message: "Can't show member" });
        if (response.length > 0)
            res.send(response);
        else
            res.send({ message: "There are no members who have no team yet" })
    });
});
router.post('/add-member', (req, res) => {
    const account_staff_id = req.body.account_staff_id
    const account_center_id = req.body.account_center_id
    connection.query('INSERT INTO assignment VALUES (?, ?)', [account_staff_id, account_center_id], (err, response) => {
        if (err)
            res.send({ message: "Can't add member" });
        else
            res.send(response);
    });
});
router.post('/delete-member', (req, res) => {
    const account_staff_id = req.body.account_staff_id
    connection.query('DELETE FROM assignment WHERE staff_id = ?', [account_staff_id], (err, response) => {
        if (err)
            res.send({ message: "Can't delete member" });
        else
            res.send(response);
    });
});
router.post('/tasks-data', (req, res) => {
    const event_id = req.body.event_id
    const timeFormat = "%d-%m-%Y"
    connection.query('SELECT task_id, task_name, task_description, DATE_FORMAT(deadline, ?) as deadline, status, staff_id FROM emd.task where event_id = ?', [timeFormat, event_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/event-task', (req, res) => {
    const account_id = req.body.account_id
    connection.query('SELECT DISTINCT a.event_id, b.event_name FROM emd.task a, emd.emd_event b Where a.event_id = b.event_id and a.center_id = ?', [account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/add-task', (req, res) => {
    const event_id = req.body.event_id
    const task_name = req.body.task_name
    const task_description = req.body.task_description
    const staff_id = req.body.staff_id
    const deadline = req.body.deadline
    const status = "In Process"
    const center_id = req.body.center_id
    connection.query('INSERT INTO task (task_name, task_description, deadline, status, event_id, staff_id, center_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [task_name, task_description, deadline, status, event_id, staff_id, center_id], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/edit-task', (req, res) => {
    const task_name = req.body.task_name
    const task_description = req.body.task_description
    const staff_id = req.body.staff_id
    const deadline = req.body.deadline
    const task_id = req.body.task_id
    connection.query("UPDATE task SET task_name = ?, task_description = ?, deadline = ?, staff_id = ? WHERE (task_id = ?)", [task_name, task_description, deadline, staff_id, task_id], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/delete-task', (req, res) => {
    const task_id = req.body.task_id
    connection.query("DELETE FROM task WHERE (task_id = ?)", [task_id], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/task-done', (req, res) => {
    const event_id = req.body.event_id
    const status = "Done"
    const timeFormat = "%d-%m-%Y"
    connection.query('SELECT task_id, task_name, task_description, DATE_FORMAT(deadline, ?) as deadline, status, staff_id FROM emd.task where event_id = ? and status = ?', [timeFormat, event_id, status], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/task-not-done', (req, res) => {
    const event_id = req.body.event_id
    const status = "In Process"
    const timeFormat = "%d-%m-%Y"
    connection.query('SELECT task_id, task_name, task_description, DATE_FORMAT(deadline, ?) as deadline, status, staff_id FROM emd.task where event_id = ? and status = ?', [timeFormat, event_id, status], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/task-fail', (req, res) => {
    const event_id = req.body.event_id
    const status = "Fail"
    const timeFormat = "%d-%m-%Y"
    connection.query('SELECT task_id, task_name, task_description, DATE_FORMAT(deadline, ?) as deadline, status, staff_id FROM emd.task where event_id = ? and status = ?', [timeFormat, event_id, status], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/check-task', (req, res) => {
    const datetime = "%Y-%m-%d"
    const status = "Fail"
    const inProcess = "In Process"
    connection.query('UPDATE task SET status = ? where DATE_FORMAT(deadline, ?) < ? and status = ?', [status, datetime, today, inProcess], (err, response) => {
        if (err)
            res.send({ message: err })
        else
            res.send(response);
    });
});
router.post('/add-event', (req, res) => {
    const event_name = req.body.event_name
    const event_place = req.body.event_place
    const event_date = req.body.event_date
    const event_duration = req.body.event_duration
    const event_description = req.body.event_description
    const center_id = req.body.center_id
    connection.query('INSERT INTO emd_event (event_name, event_place, event_date, event_duration, event_description, center_id) VALUES (?, ?, ?, ?, ?, ?)', [event_name, event_place, event_date, event_duration, event_description, center_id], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/edit-event', (req, res) => {
    const event_id = req.body.event_id
    const event_name = req.body.event_name
    const event_place = req.body.event_place
    const event_date = req.body.event_date
    const event_duration = req.body.event_duration
    const event_description = req.body.event_description
    connection.query('UPDATE emd_event SET event_name = ?, event_place = ?, event_date = ?, event_duration = ?, event_description = ? WHERE event_id = ?', [event_name, event_place, event_date, event_duration, event_description, event_id], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/delete-event', (req, res) => {
    const event_id = req.body.event_id
    connection.query("DELETE FROM emd_event WHERE (event_id = ?)", [event_id], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/event-center-available', (req, res) => {
    const datetimeformat = "%d-%m-%Y"
    const datetime = "%Y-%m-%d"
    const account_id = req.body.account_id
    const timeFormat = "%H:%i:%s"
    connection.query('SELECT DISTINCT event_id, event_name, event_place, event_date as time, DATE_FORMAT(event_date, ?) as event_date, DATE_FORMAT(event_date, ?) as event_time, event_duration, event_description, center_id  FROM emd_event where center_id = ? and DATE_FORMAT(event_date, ?) >= ?', [datetimeformat, timeFormat, account_id, datetime, today], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/event-center-unavailable', (req, res) => {
    const datetimeformat = "%d-%m-%Y"
    const datetime = "%Y-%m-%d"
    const account_id = req.body.account_id
    const timeFormat = "%H:%i:%s"
    connection.query('SELECT DISTINCT event_id, event_name, event_place, event_date as time, DATE_FORMAT(event_date, ?) as event_date, DATE_FORMAT(event_date, ?) as event_time, event_duration, event_description, center_id  FROM emd_event where center_id = ? and DATE_FORMAT(event_date, ?) < ?', [datetimeformat, timeFormat, account_id, datetime, today], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/show', (req, res) => {
    const event_id = req.body.event_id
    connection.query('SELECT DISTINCT * FROM event_show WHERE event_id = ?', [event_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/add-show', (req, res) => {
    const event_id = req.body.event_id
    const show_name = req.body.show_name
    const show_duration = req.body.show_duration
    const show_speaker = req.body.show_speaker
    connection.query('INSERT INTO event_show (event_id, show_name, show_duration, show_speaker) VALUES (?, ?, ?, ?)', [event_id, show_name, show_duration, show_speaker], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/edit-show', (req, res) => {
    const id = req.body.id
    const show_name = req.body.show_name
    const show_duration = req.body.show_duration
    const show_speaker = req.body.show_speaker
    connection.query('UPDATE event_show SET show_name = ?, show_duration = ?, show_speaker = ? WHERE id = ?', [show_name, show_duration, show_speaker, id], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/delete-show', (req, res) => {
    const id = req.body.id
    connection.query("DELETE FROM event_show WHERE (id = ?)", [id], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/finance', (req, res) => {
    const event_id = req.body.event_id
    connection.query('SELECT DISTINCT * FROM finance WHERE event_id = ?', [event_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/add-finance', (req, res) => {
    const event_id = req.body.event_id;
    const finance_spending_description = req.body.finance_spending_description
    const finance_spending = req.body.finance_spending
    connection.query('INSERT INTO finance (event_id, finance_spending_description, finance_spending) VALUES (?, ?, ?)', [event_id, finance_spending_description, finance_spending], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/edit-finance', (req, res) => {
    const id = req.body.id
    const finance_spending_description = req.body.finance_spending_description
    const finance_spending = req.body.finance_spending
    connection.query('UPDATE finance SET finance_spending_description = ?, finance_spending = ? WHERE id = ?', [finance_spending_description, finance_spending, id], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/delete-finance', (req, res) => {
    const id = req.body.id
    connection.query("DELETE FROM finance WHERE (id = ?)", [id], (err, response) => {
        if (err)
            res.send({ message: err });
        else
            res.send(response);
    });
});
router.post('/finance-center', (req, res) => {
    const center_id = req.body.center_id
    connection.query('Select distinct b.event_name, finance_spending_description, finance_spending from finance a, emd_event b Where a.event_id = b.event_id and b.center_id = ?', [center_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/finance-profit', (req, res) => {
    const center_id = req.body.center_id
    connection.query('Select distinct b.event_name, sum(finance_spending) as profit from finance a, emd_event b Where a.event_id = b.event_id and b.center_id = ? Group by (b.event_name)', [center_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/finance-chart', (req, res) => {
    const center_id = req.body.center_id
    connection.query('Select distinct b.event_id, b.event_name from finance a, emd_event b Where a.event_id = b.event_id and b.center_id = ?', [center_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/chart', (req, res) => {
    const event_id = req.body.event_id
    const center_id = req.body.center_id
    connection.query('Select distinct finance_spending_description, finance_spending from finance a, emd_event b Where a.event_id = b.event_id and b.center_id = ? and a.event_id = ?', [center_id, event_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/account-details', (req, res) => {
    const account_id = req.body.account_id
    connection.query('SELECT DISTINCT account_name, account_email FROM emd.account where account_id = ?', [account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't show data" });
        else
            res.send(response);
    });
});
router.post('/edit-account-details', (req, res) => {
    const account_id = req.body.account_id
    const account_name = req.body.account_name
    const account_email = req.body.account_email
    connection.query('UPDATE account SET account_name = ?, account_email = ? where account_id = ?', [account_name, account_email, account_id], (err, response) => {
        if (err)
            res.send({ message: "Can't update account" });
        else
            res.send(response);
    });
});
module.exports = router;