var express = require("express");
var router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "emd",
});

// Role Admin
router.get("/finance-profit-admin", (req, res) => {
    connection.query(
        "SELECT DISTINCT a.event_name, sum(b.finance_spending) as profit FROM emd_event a LEFT JOIN finance b ON a.event_id = b.event_id GROUP BY (a.event_name)",
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/finance-center-admin", (req, res) => {
    const center_username = req.body.center_username;
    connection.query(
        "SELECT DISTINCT a.event_name, sum(b.finance_spending) as profit FROM emd_event a LEFT JOIN finance b ON a.event_id = b.event_id WHERE a.center_username = ? GROUP BY (a.event_name) ", [center_username],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.get("/finance-admin", (req, res) => {
    connection.query("SELECT DISTINCT * FROM finance", (err, response) => {
        if (err) res.send({ message: "Can't show data" });
        else res.send(response);
    });
});
router.get("/tasks-data-admin", (req, res) => {
    connection.query(
        "SELECT task_name, task_description, start_date, deadline, status, staff_id, b.event_name, c.account_name FROM emd.task a, emd_event b, account c WHERE a.event_id = b.event_id and a.center_id = c.account_username",
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.get("/show-data-admin", (req, res) => {
    connection.query(
        "SELECT show_name, show_description, show_start_time, show_finish_time, show_speaker, b.event_name, c.account_name FROM event_show a, emd_event b, account c WHERE a.event_id = b.event_id and b.center_username = c.account_username",
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.get("/finance-data-admin", (req, res) => {
    connection.query(
        "SELECT finance_name , finance_description, finance_time, finance_spending, b.event_name, c.account_name FROM finance a, emd_event b, account c WHERE a.event_id = b.event_id and b.center_username = c.account_username",
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/edit-event-admin", (req, res) => {
    const event_id = req.body.event_id;
    const event_name = req.body.event_name;
    const event_place = req.body.event_place;
    const event_date = req.body.event_date;
    const event_duration = req.body.event_duration;
    const event_description = req.body.event_description;
    const center_username = req.body.center_username;
    connection.query(
        "UPDATE emd_event SET event_name = ?, event_place = ?, event_date = ?, event_duration = ?, event_description = ?, center_username = ? WHERE event_id = ?", [
            event_name,
            event_place,
            event_date,
            event_duration,
            event_description,
            center_username,
            event_id,
        ],
        (err, response) => {
            if (err) res.send({ message: "Can't update event ! Please try again" });
            else res.send(response);
        }
    );
});
router.post("/edit-event-admin-center", (req, res) => {
    const event_id = req.body.event_id;
    const event_name = req.body.event_name;
    const event_place = req.body.event_place;
    const event_date = req.body.event_date;
    const event_duration = req.body.event_duration;
    const event_description = req.body.event_description;
    const center_username = req.body.center_username;
    connection.query(
        "UPDATE emd_event SET event_name = ?, event_place = ?, event_date = ?, event_duration = ?, event_description = ?, center_username = ? WHERE event_id = ?", [
            event_name,
            event_place,
            event_date,
            event_duration,
            event_description,
            center_username,
            event_id,
        ],
        (err, response) => {
            if (err) res.send({ message: "Can't update event ! Please try again" });
            else {
                connection.query(
                    "DELETE FROM report WHERE event_id = ?", [event_id],
                    (err, response) => {
                        if (err)
                            res.send({ message: "Can't update event ! Please try again" });
                        else {
                            connection.query(
                                "DELETE FROM task WHERE event_id = ?", [event_id],
                                (err, response) => {
                                    if (err)
                                        res.send({
                                            message: "Can't update event ! Please try again",
                                        });
                                    else res.send(response);
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});
router.get("/account-center-admin", (req, res) => {
    connection.query(
        "SELECT DISTINCT a.account_username, a.account_name, a.account_color FROM account a, emd_event b WHERE a.account_username = b.center_username",
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/account", (req, res) => {
    const account_username = req.body.account_username;
    connection.query(
        "SELECT DISTINCT * FROM account WHERE account_username <> ?", [account_username],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/create-user", (req, res) => {
    const account_name = req.body.account_name;
    const account_username = req.body.account_username;
    const account_password = req.body.account_password;
    const account_email = req.body.account_email;
    const account_role = req.body.account_role;
    const account_color = req.body.account_color;
    connection.query(
        "SELECT DISTINCT account_username, account_email FROM account WHERE account_username = ? or account_email = ?", [account_username, account_email],
        (err, response) => {
            if (err) res.send({ message: "Can't create account" });
            else if (response.length > 0)
                res.send({ message: "Can't create same account username or email" });
            else {
                if (account_role === "Admin") {
                    connection.query(
                        "INSERT INTO account (account_name, account_username, account_password, account_email, account_role, account_color, is_admin) VALUES (?, ?, ?, ?, 'Admin', ?, 'true')", [
                            account_name,
                            account_username,
                            account_password,
                            account_email,
                            account_color,
                        ],
                        (err, response) => {
                            if (err) res.send({ message: "Can't create account" });
                            else res.send(response);
                        }
                    );
                } else if (account_role === "Sub Center") {
                    connection.query(
                        "INSERT INTO account (account_name, account_username, account_password, account_email, account_role, account_color, is_admin) VALUES (?, ?, ?, ?, 'Sub Center', ?, 'false')", [
                            account_name,
                            account_username,
                            account_password,
                            account_email,
                            account_color,
                        ],
                        (err, response) => {
                            if (err) res.send({ message: "Can't create account" });
                            else res.send(response);
                        }
                    );
                } else {
                    connection.query(
                        "INSERT INTO account (account_name, account_username, account_password, account_email, account_role, account_color, is_admin) VALUES (?, ?, ?, ?, ?, ?)", [
                            account_name,
                            account_username,
                            account_password,
                            account_email,
                            account_role,
                            account_color,
                        ],
                        (err, response) => {
                            if (err) res.send({ message: "Can't create account" });
                            else res.send(response);
                        }
                    );
                }
            }
        }
    );
});
router.post("/edit-user", (req, res) => {
    const account_name = req.body.account_name;
    const account_username = req.body.account_username;
    const account_email = req.body.account_email;
    const account_role = req.body.account_role;
    const account_password = req.body.account_password;
    const account_color = req.body.account_color;
    connection.query(
        "SELECT DISTINCT account_username, account_email FROM account WHERE account_email = ? and account_username != ?", [account_email, account_username],
        (err, response) => {
            if (err) res.send({ message: "Can't edit account" });
            else if (response.length > 0)
                res.send({ message: "Can't edit same account email" });
            else {
                connection.query(
                    "UPDATE account SET account_name = ?, account_email = ?, account_role = ?, account_password = ?, account_color = ? WHERE account_username = ?", [
                        account_name,
                        account_email,
                        account_role,
                        account_password,
                        account_color,
                        account_username,
                    ],
                    (err, response) => {
                        if (err) res.send({ message: "Can't edit account" });
                        else res.send(response);
                    }
                );
            }
        }
    );
});
router.post("/delete-user", (req, res) => {
    const account_username = req.body.account_username;
    connection.query(
        "DELETE FROM account WHERE account_username = ?", [account_username],
        (err, response) => {
            if (err) res.send({ message: "Can't delete account" });
            else res.send(response);
        }
    );
});
router.post("/test", (req, res) => {
    connection.query(
        "SELECT event_id FROM emd_event WHERE DATE_FORMAT(event_date, '%Y-%m-%d') > ?", [today],
        (err, response) => {
            if (err) res.send({ message: "Can't delete account" });
            else {
                let temp = [];
                response.forEach((item) => temp.push(item.event_id));
                res.send(temp);
            }
        }
    );
});
router.get("/testapi", (req, res) => {
    connection.query("SELECT * FROM account", (err, response) => {
        if (err) res.send({ message: "Can't delete account" });
        else {
            let temp = response.map((item) => item.account_username);
            res.send(temp);
        }
    });
});
router.post("/block-user", (req, res) => {
    const account_username = req.body.account_username;
    const account_role = req.body.account_role;
    const account_username_another = req.body.account_username_another;
    connection.query(
        "UPDATE account SET account_role = 'Blocked' WHERE account_username = ?", [account_username],
        (err, response) => {
            if (err) res.send({ message: "Can't block account" });
            else {
                if (account_role === "DTU Event Center") {
                    connection.query(
                        "SELECT event_id FROM emd_event WHERE DATE_FORMAT(event_date, '%Y-%m-%d') > ? AND center_username = ?", [today, account_username],
                        (err, response) => {
                            if (err) res.send({ message: "Can't block account" });
                            else {
                                let temp = response.map((item) => item.event_id);
                                temp.forEach((item) => {
                                    connection.query("DELETE FROM report WHERE event_id = ?", [
                                        item,
                                    ]);
                                    connection.query("DELETE FROM task WHERE event_id = ?", [
                                        item,
                                    ]);
                                });
                                connection.query(
                                    "UPDATE emd_event SET center_username = ? WHERE DATE_FORMAT(event_date, '%Y-%m-%d') > ? AND center_username = ?", [account_username_another, today, account_username],
                                    (err, response) => {
                                        if (err) res.send({ message: "Can't block account" });
                                        else {
                                            connection.query(
                                                "DELETE FROM assignment WHERE center_id = ?", [account_username],
                                                (err, response) => {
                                                    if (err) res.send({ message: "Can't block account" });
                                                    else res.send(response);
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                } else res.send(response);
            }
        }
    );
});
router.get("/event", (req, res) => {
    connection.query(
        "SELECT DISTINCT event_id, event_name, event_place, DATE_FORMAT(event_date, '%d-%m-%Y') as event_date, DATE_FORMAT(event_date, '%H:%i:%s') as event_time, event_duration, event_date as time, event_description, center_username FROM emd_event",
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = "0" + dd;
}

if (mm < 10) {
    mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + dd;
//Login & Account Details
router.post("/login", (req, res) => {
    const account_username = req.body.account_username;
    const account_password = req.body.account_password;
    connection.query(
        "SELECT DISTINCT * FROM account where account_username = ? and account_password = ?", [account_username, account_password],
        (error, results) => {
            if (error) res.send({ message: "Wrong username / password !" });
            if (results.length > 0) {
                res.send(results);
            } else res.send({ message: "Wrong username / password !" });
        }
    );
});
router.post("/change-password", (req, res) => {
    const new_password = req.body.new_password;
    const old_password = req.body.old_password;
    const account_username = req.body.account_username;
    connection.query(
        "SELECT DISTINCT * FROM account where account_username = ? and account_password = ?", [account_username, old_password],
        (error, results) => {
            if (error) res.send({ message: "Old password is not correct" });
            if (results.length > 0) {
                connection.query(
                    "UPDATE account SET account_password = ? where account_username = ?", [new_password, account_username],
                    (error, results) => {
                        if (error) res.send({ message: "Can't update your account" });
                        else res.send(results);
                    }
                );
            } else res.send({ message: "Old password is not correct" });
        }
    );
});
router.post("/account-details", (req, res) => {
    const account_username = req.body.account_username;
    connection.query(
        "SELECT DISTINCT account_name, account_email, account_color FROM emd.account WHERE account_username = ?", [account_username],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/edit-account-details", (req, res) => {
    const account_username = req.body.account_username;
    const account_name = req.body.account_name;
    const account_email = req.body.account_email;
    connection.query(
        "UPDATE account SET account_name = ?, account_email = ? where account_username = ?", [account_name, account_email, account_username],
        (err, response) => {
            if (err) res.send({ message: "Can't update account" });
            else res.send(response);
        }
    );
});
router.post("/edit-center-details", (req, res) => {
    const account_username = req.body.account_username;
    const account_name = req.body.account_name;
    const account_email = req.body.account_email;
    const account_color = req.body.account_color;
    connection.query(
        "UPDATE account SET account_name = ?, account_email = ?, account_color = ? WHERE account_username = ?", [account_name, account_email, account_color, account_username],
        (err, response) => {
            if (err) res.send({ message: "Can't update account" });
            else res.send(response);
        }
    );
});
router.post("/check-email", (req, res) => {
    const account_email = req.body.account_email;
    connection.query(
        "SELECT account_email FROM account WHERE account_email = ?", [account_email],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/update-password", (req, res) => {
    const account_password = req.body.account_password;
    const account_email = req.body.account_email;
    connection.query(
        "UPDATE account SET account_password = ? WHERE account_email = ?", [account_password, account_email],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
//Role Center
router.post("/report-center", (req, res) => {
    const center_username = req.body.center_username;
    connection.query(
        "SELECT a.id, a.report_detail, a.report_time, b.event_name, c.task_name, b.center_username, a.annunciator, a.report_handle FROM report a, emd_event b, task c WHERE a.event_id = b.event_id AND a.task_id = c.task_id AND b.center_username = ? AND a.report_handle IS NULL", [center_username],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/report-list", (req, res) => {
    const center_username = req.body.center_username;
    connection.query(
        "SELECT a.id, a.report_detail, a.report_time, b.event_name, c.task_name, b.center_username, a.annunciator, a.report_handle FROM report a, emd_event b, task c WHERE a.event_id = b.event_id AND a.task_id = c.task_id AND b.center_username = ?", [center_username],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.get("/check-report", (req, res) => {
    connection.query(
        "UPDATE report SET report_handle = 'Unsolved' where DATE_FORMAT(report_time, '%Y-%m-%d') < ? and report_handle IS NULL", [today],
        (err, response) => {
            if (err) res.send({ message: "Can't check report" });
            else res.send(response);
        }
    );
});
router.post("/event-center", (req, res) => {
    const account_username = req.body.account_username;
    connection.query(
        "SELECT DISTINCT event_id, event_name, event_place, event_date as time, DATE_FORMAT(event_date, '%d-%m-%Y') as event_date, DATE_FORMAT(event_date, '%H:%i:%s') as event_time, event_duration, event_description, center_username  FROM emd_event where center_username = ?", [account_username],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/member", (req, res) => {
    const account_username = req.body.account_username;
    connection.query(
        "SELECT DISTINCT account_username, account_name, account_email FROM account a, assignment b where a.account_username = b.staff_id and b.center_id = ?", [account_username],
        (err, response) => {
            if (err) res.send({ message: "Can't show member" });
            else res.send(response);
        }
    );
});
router.get("/member-all", (req, res) => {
    connection.query(
        "SELECT a.account_username, a.account_name FROM account a LEFT JOIN assignment b ON a.account_username = b.staff_id WHERE a.account_role = 'DTU Event Staff' and b.center_id is NULL",
        (err, response) => {
            if (err) res.send({ message: "Can't show member" });
            if (response.length > 0) res.send(response);
            else res.send({ message: "There are no members who have no team yet" });
        }
    );
});
router.post("/add-member", (req, res) => {
    const account_staff_id = req.body.account_staff_id;
    const account_center_id = req.body.account_center_id;
    connection.query(
        "INSERT INTO assignment VALUES (?, ?)", [account_staff_id, account_center_id],
        (err, response) => {
            if (err) res.send({ message: "Can't add member" });
            else res.send(response);
        }
    );
});
router.post("/delete-member", (req, res) => {
    const account_staff_id = req.body.account_staff_id;
    const staff_id = req.body.staff_id;
    connection.query(
        "SELECT DISTINCT * FROM task a, emd_event b WHERE staff_id LIKE ? and a.event_id = b.event_id and DATE_FORMAT(b.event_date, '%Y-%m-%d') >= ?", [staff_id, today],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else if (response.length > 0)
                res.send({ message: "You must remove staff's task before delete" });
            else {
                connection.query(
                    "DELETE FROM assignment WHERE staff_id = ?", [account_staff_id],
                    (err, response) => {
                        if (err) res.send({ message: "Can't delete member" });
                        else res.send(response);
                    }
                );
            }
        }
    );
});
router.post("/tasks-data", (req, res) => {
    const event_id = req.body.event_id;
    connection.query(
        "SELECT task_id, task_name, task_description, DATE_FORMAT(deadline, '%d-%m-%Y') as deadline, DATE_FORMAT(start_date, '%d-%m-%Y') as start_date, status, staff_id FROM emd.task where event_id = ?", [event_id],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/event-task", (req, res) => {
    const account_username = req.body.account_username;
    connection.query(
        "SELECT DISTINCT a.event_id, b.event_name FROM emd.task a, emd.emd_event b Where a.event_id = b.event_id and a.center_id = ?", [account_username],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/add-task", (req, res) => {
    const event_id = req.body.event_id;
    const task_name = req.body.task_name;
    const task_description = req.body.task_description;
    const staff_id = req.body.staff_id;
    const deadline = req.body.deadline;
    const start_date = req.body.start_date;
    const center_id = req.body.center_id;
    connection.query(
        "INSERT INTO task (task_name, task_description, deadline, status, event_id, staff_id, center_id, start_date) VALUES (?, ?, ?, 'In Process', ?, ?, ?, ?)", [
            task_name,
            task_description,
            deadline,
            event_id,
            staff_id,
            center_id,
            start_date,
        ],
        (err, response) => {
            if (err) res.send({ message: "Can't add task ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/edit-task", (req, res) => {
    const task_name = req.body.task_name;
    const task_description = req.body.task_description;
    const staff_id = req.body.staff_id;
    const deadline = req.body.deadline;
    const start_date = req.body.start_date;
    const task_id = req.body.task_id;
    const status = req.body.status;
    connection.query(
        "UPDATE task SET task_name = ?, task_description = ?, deadline = ?, staff_id = ?, start_date = ?, status = ? WHERE (task_id = ?)", [
            task_name,
            task_description,
            deadline,
            staff_id,
            start_date,
            status,
            task_id,
        ],
        (err, response) => {
            if (err) res.send({ message: "Can't update task ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/delete-task", (req, res) => {
    const task_id = req.body.task_id;
    connection.query(
        "DELETE FROM report WHERE (task_id = ?)", [task_id],
        (err, response) => {
            if (err) res.send({ message: "Can't delete task ! Please try again !" });
            else {
                connection.query(
                    "DELETE FROM task WHERE (task_id = ?)", [task_id],
                    (err, response) => {
                        if (err)
                            res.send({ message: "Can't delete task ! Please try again !" });
                        else res.send(response);
                    }
                );
            }
        }
    );
});
router.get("/check-task", (req, res) => {
    connection.query(
        "UPDATE task SET status = 'Fail' where DATE_FORMAT(deadline, '%Y-%m-%d') < ? and status = 'In Process'", [today],
        (err, response) => {
            if (err) res.send({ message: "Can't check task ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/add-event", (req, res) => {
    const event_name = req.body.event_name;
    const event_place = req.body.event_place;
    const event_date = req.body.event_date;
    const event_duration = req.body.event_duration;
    const event_description = req.body.event_description;
    const center_username = req.body.center_username;
    connection.query(
        "INSERT INTO emd_event (event_name, event_place, event_date, event_duration, event_description, center_username) VALUES (?, ?, ?, ?, ?, ?)", [
            event_name,
            event_place,
            event_date,
            event_duration,
            event_description,
            center_username,
        ],
        (err, response) => {
            if (err) res.send({ message: "Can't add new event, please try again !" });
            else res.send(response);
        }
    );
});
router.post("/edit-event", (req, res) => {
    const event_id = req.body.event_id;
    const event_name = req.body.event_name;
    const event_place = req.body.event_place;
    const event_date = req.body.event_date;
    const event_duration = req.body.event_duration;
    const event_description = req.body.event_description;
    connection.query(
        "UPDATE emd_event SET event_name = ?, event_place = ?, event_date = ?, event_duration = ?, event_description = ? WHERE event_id = ?", [
            event_name,
            event_place,
            event_date,
            event_duration,
            event_description,
            event_id,
        ],
        (err, response) => {
            if (err) res.send({ message: "Can't update event ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/delete-event", (req, res) => {
    const event_id = req.body.event_id;
    const event_id1 = req.body.event_id;
    const event_id2 = req.body.event_id;
    const event_id3 = req.body.event_id;
    const event_id4 = req.body.event_id;
    connection.query(
        "DELETE FROM report WHERE (event_id = ?)", [event_id],
        (err, response) => {
            if (err) res.send({ message: "Can't delete event ! Please try again !" });
            else if (response) {
                connection.query(
                    "DELETE FROM finance WHERE (event_id = ?)", [event_id1],
                    (err, response) => {
                        if (err)
                            res.send({ message: "Can't delete event ! Please try again !" });
                        else if (response) {
                            connection.query(
                                "DELETE FROM event_show WHERE (event_id = ?)", [event_id2],
                                (err) => {
                                    if (err)
                                        res.send({
                                            message: "Can't delete event ! Please try again !",
                                        });
                                    else if (response) {
                                        connection.query(
                                            "DELETE FROM task WHERE (event_id = ?)", [event_id4],
                                            (err, response) => {
                                                if (err)
                                                    res.send({
                                                        message: "Can't delete event ! Please try again !",
                                                    });
                                                else if (response) {
                                                    connection.query(
                                                        "DELETE FROM emd_event WHERE (event_id = ?)", [event_id3],
                                                        (err, response) => {
                                                            if (err)
                                                                res.send({
                                                                    message: "Can't delete event ! Please try again !",
                                                                });
                                                            else res.send(response);
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    } else
                                        res.send({
                                            message: "Cannot delete this event, try again !",
                                        });
                                }
                            );
                        } else
                            res.send({ message: "Cannot delete this event, try again !" });
                    }
                );
            } else res.send({ message: "Cannot delete this event, try again !" });
        }
    );
});
router.post("/show", (req, res) => {
    const event_id = req.body.event_id;
    connection.query(
        "SELECT DISTINCT * FROM event_show WHERE event_id = ?", [event_id],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/add-show", (req, res) => {
    const event_id = req.body.event_id;
    const show_name = req.body.show_name;
    const show_description = req.body.show_description;
    const show_start_time = req.body.show_start_time;
    const show_finish_time = req.body.show_finish_time;
    const show_speaker = req.body.show_speaker;
    connection.query(
        "INSERT INTO event_show (event_id, show_name, show_start_time, show_finish_time, show_speaker, show_description) VALUES (?, ?, ?, ?, ?, ?)", [
            event_id,
            show_name,
            show_start_time,
            show_finish_time,
            show_speaker,
            show_description,
        ],
        (err, response) => {
            if (err)
                res.send({ message: "Can't add this show ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/edit-show", (req, res) => {
    const id = req.body.id;
    const show_name = req.body.show_name;
    const show_description = req.body.show_description;
    const show_start_time = req.body.show_start_time;
    const show_finish_time = req.body.show_finish_time;
    const show_speaker = req.body.show_speaker;
    connection.query(
        "UPDATE event_show SET show_name = ?, show_start_time = ?, show_finish_time = ?, show_speaker = ?, show_description = ? WHERE id = ?", [
            show_name,
            show_start_time,
            show_finish_time,
            show_speaker,
            show_description,
            id,
        ],
        (err, response) => {
            if (err)
                res.send({ message: "Can't update this show ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/delete-show", (req, res) => {
    const id = req.body.id;
    connection.query(
        "DELETE FROM event_show WHERE (id = ?)", [id],
        (err, response) => {
            if (err)
                res.send({ message: "Can't delete this show ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/finance", (req, res) => {
    const event_id = req.body.event_id;
    connection.query(
        "SELECT DISTINCT * FROM finance WHERE event_id = ?", [event_id],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/add-finance", (req, res) => {
    const event_id = req.body.event_id;
    const finance_name = req.body.finance_name;
    const finance_description = req.body.finance_description;
    const finance_time = req.body.finance_time;
    const finance_spending = req.body.finance_spending;
    connection.query(
        "INSERT INTO finance (event_id, finance_name, finance_description, finance_time, finance_spending) VALUES (?, ?, ?, ?, ?)", [
            event_id,
            finance_name,
            finance_description,
            finance_time,
            finance_spending,
        ],
        (err, response) => {
            if (err)
                res.send({ message: "Can't add this finance ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/edit-finance", (req, res) => {
    const id = req.body.id;
    const finance_name = req.body.finance_name;
    const finance_description = req.body.finance_description;
    const finance_time = req.body.finance_time;
    const finance_spending = req.body.finance_spending;
    connection.query(
        "UPDATE finance SET finance_name = ?, finance_description = ?, finance_time = ?, finance_spending = ? WHERE id = ?", [finance_name, finance_description, finance_time, finance_spending, id],
        (err, response) => {
            if (err)
                res.send({ message: "Can't update this finance ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/delete-finance", (req, res) => {
    const id = req.body.id;
    connection.query(
        "DELETE FROM finance WHERE (id = ?)", [id],
        (err, response) => {
            if (err)
                res.send({ message: "Can't delete this finance ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/finance-center", (req, res) => {
    const center_username = req.body.center_username;
    connection.query(
        "SELECT DISTINCT a.finance_name, a.finance_description, a.finance_time, a.finance_spending FROM finance a, emd_event b WHERE a.event_id = b.event_id AND b.center_username = ?", [center_username],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/finance-profit", (req, res) => {
    const center_username = req.body.center_username;
    connection.query(
        "SELECT DISTINCT a.event_name, sum(b.finance_spending) as profit FROM emd_event a LEFT JOIN finance b ON a.event_id = b.event_id WHERE a.center_username = ? GROUP BY (a.event_name)", [center_username],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/update-report", (req, res) => {
    const id = req.body.id;
    connection.query(
        'UPDATE report SET report_handle = "Solved" WHERE id = ?', [id],
        (err, response) => {
            if (err)
                res.send({ message: "Can't update this report ! Please try again !" });
            else res.send(response);
        }
    );
});
//Staff Role
router.post("/event-staff", (req, res) => {
    const staff_id = req.body.staff_id;
    connection.query(
        "SELECT * FROM assignment WHERE staff_id LIKE ?", [staff_id],
        (err, response) => {
            if (err) res.send({ message: "Can't show data ! Please try again !" });
            else if (response.length === 0) res.send([]);
            else {
                connection.query(
                    "SELECT distinct b.event_id, b.event_name, b.event_place, b.event_date, b.event_duration, b.event_description, DATE_FORMAT(b.event_date, '%d-%m-%Y') as event_date, DATE_FORMAT(b.event_date, '%H:%i:%s') as event_time, b.event_date as time FROM task a, emd_event b WHERE a.event_id = b.event_id and a.staff_id LIKE ?", [staff_id],
                    (err, response) => {
                        if (err)
                            res.send({ message: "Can't show data ! Please try again !" });
                        else res.send(response);
                    }
                );
            }
        }
    );
});

router.get("/account-center", (req, res) => {
    connection.query(
        'SELECT distinct * FROM account where account_role = "DTU Event Center" OR account_role = "Sub Center"',
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/task-staff-all", (req, res) => {
    const staff_id = req.body.staff_id;
    const event_id = req.body.event_id;
    connection.query(
        "SELECT distinct * from task where staff_id like ? and event_id = ?", [staff_id, event_id],
        (err, response) => {
            if (err) res.send({ message: "Can't show data ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/task-staff-done", (req, res) => {
    const staff_id = req.body.staff_id;
    const event_id = req.body.event_id;
    connection.query(
        'SELECT distinct * from task where staff_id like ? and status = "Done" and event_id = ?', [staff_id, event_id],
        (err, response) => {
            if (err) res.send({ message: "Can't show data ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/task-staff-inprocess", (req, res) => {
    const staff_id = req.body.staff_id;
    connection.query(
        "SELECT DISTINCT * FROM assignment WHERE staff_id LIKE ?", [staff_id],
        (err, response) => {
            if (err) res.send({ message: "Can't show data ! Please try again !" });
            else if (response.length !== 0) {
                connection.query(
                    'SELECT distinct * from task where staff_id like ? and status = "In Process"', [staff_id],
                    (err, response) => {
                        if (err)
                            res.send({ message: "Can't show data ! Please try again !" });
                        else res.send(response);
                    }
                );
            } else res.send([]);
        }
    );
});
router.post("/task-staff-fail", (req, res) => {
    const staff_id = req.body.staff_id;
    const event_id = req.body.event_id;
    connection.query(
        'SELECT distinct * from task where staff_id like ? and status = "Fail" and event_id = ?', [staff_id, event_id],
        (err, response) => {
            if (err) res.send({ message: "Can't show data ! Please try again !" });
            else res.send(response);
        }
    );
});
router.post("/update-task", (req, res) => {
    const task_id = req.body.task_id;
    connection.query(
        'UPDATE task SET status = "Done" WHERE task_id = ?', [task_id],
        (err, response) => {
            if (err) res.send({ message: "Can't update task, please try again !" });
            else res.send(response);
        }
    );
});
router.post("/task-event", (req, res) => {
    const event_id = req.body.event_id;
    const staff_id = req.body.staff_id;
    connection.query(
        "SELECT task_id, task_name FROM emd.task WHERE event_id = ? AND staff_id like ?", [event_id, staff_id],
        (err, response) => {
            if (err) res.send({ message: "Can't show data" });
            else res.send(response);
        }
    );
});
router.post("/report", (req, res) => {
    const event_id = req.body.event_id;
    const task_id = req.body.task_id;
    const report_detail = req.body.report_detail;
    const report_time = req.body.report_time;
    const annunciator = req.body.annunciator;
    connection.query(
        "INSERT INTO report (event_id, task_id, report_detail, report_time, annunciator) VALUES (?, ?, ?, ?, ?)", [event_id, task_id, report_detail, report_time, annunciator],
        (err, response) => {
            if (err)
                res.send({ message: "Can't submit this report ! Please try again !" });
            else res.send(response);
        }
    );
});
module.exports = router;