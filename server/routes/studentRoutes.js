const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all students
router.get("/", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// ADD student
router.post("/", (req, res) => {
    const { name, email, course } = req.body;

    db.query(
        "INSERT INTO students (name, email, course) VALUES (?, ?, ?)",
        [name, email, course],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Student added successfully" });
        }
    );
});

// DELETE student
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        "DELETE FROM students WHERE id = ?",
        [id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Student deleted successfully" });
        }
    );
});

module.exports = router;