const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Raj@78",   // your password
    database: "student_db"
});

db.connect((err) => {
    if (err) {
        console.log("DB connection failed", err);
    } else {
        console.log("Database connected");
    }
});

module.exports = db;