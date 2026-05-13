const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const db = require("../config/db");

const bcrypt = require("bcrypt");


// ================= REGISTER API =================
router.post("/register", async (req, res) => {

    const { name, email, password, role } = req.body;

    try {

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // INSERT USER
        db.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role],
            (err, result) => {

                if (err) {
                    return res.status(500).send(err);
                }

                res.json({
                    message: "User registered successfully"
                });

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

});


// ================= LOGIN API =================
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    // CHECK USER
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            // DATABASE ERROR
            if (err) {
                return res.status(500).json(err);
            }

            // USER NOT FOUND
            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const user = result[0];

            // COMPARE PASSWORD
            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            // WRONG PASSWORD
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            }

            // GENERATE JWT TOKEN
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                "secretkey",
                {
                    expiresIn: "1h"
                }
            );

            // SUCCESS RESPONSE
            res.json({
                message: "Login successful",
                token,
                role: user.role
            });

        }
    );

});

module.exports = router;