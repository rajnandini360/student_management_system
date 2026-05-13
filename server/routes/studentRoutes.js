const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");
// GET all students
router.get("/", verifyToken, (req, res) => {

    // ADMIN CAN SEE ALL
    if (req.user.role === "admin") {

        db.query(
            "SELECT * FROM students",
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json(result);

            }
        );

    }

    // STUDENT CAN SEE ONLY OWN DATA
    else {

        db.query(
            "SELECT * FROM students WHERE email = ?",
            [req.user.email],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json(result);

            }
        );

    }

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
// UPDATE STUDENT
router.put("/:id", (req, res) => {

    const id = req.params.id;

    const { name, email, course } = req.body;

    db.query(
        "UPDATE students SET name=?, email=?, course=? WHERE id=?",
        [name, email, course, id],
        (err, result) => {

            if (err) {
                return res.status(500).send(err);
            }

            res.json({
                message: "Student updated successfully"
            });

        }
    );

});

module.exports = router;