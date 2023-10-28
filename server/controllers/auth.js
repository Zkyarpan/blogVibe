import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../db.js";

const secretKey = "Arpani$agoodboy";

export const register = (req, res) => {
  try {
    // CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (data.length > 0) {
        return res.status(409).json("User already exists!");
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const insertQuery =
        "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash];

      db.query(insertQuery, [values], (err, data) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json("User has been created.");
      });
    });
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const login = (req, res) => {
  try {
    // CHECK USER
    const q = "SELECT * FROM users WHERE username = ? ";
    db.query(q, [req.body.username], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (data.length === 0) {
        return res.status(404).json("User not found !");
      }

      const PasswordIsCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!PasswordIsCorrect) {
        return res.status(400).json("Invalid username or password !");
      }

      const token = jwt.sign({ id: data[0].id }, secretKey);
      console.log("Generated Token : ", token);

      const { password, ...other } = data[0];

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json(other);
    });
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out!");
};
