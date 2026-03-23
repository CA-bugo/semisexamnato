Jims
oks1427
•
chilling

pao [DAWN],  — 8:04 PM
Image
putangina lahat aayw gumana
PUTANGINA
Aina [HRZN],  — 8:04 PM
ka dami mo nmng problema
send mo sa gpt
pao [DAWN],  — 8:04 PM
kaw mag upload sa online
tangina pumasok lang ako eh
Everyone welcome 
jimuel
! — 8:11 PM

Wave to say hi!
Sedroul — 8:18 PM
nsa kabilang bahay ka @Thea
?
bat nakakaimik ka
Sedroul — 9:09 PM
https://x.com/jlin_nilj/status/2036008833856995820
JLin (@jlin_nilj)
Mother
Image

X•Today at 5:15 PM
angas
kenneth [ALOY],  — 9:10 PM
sebian lex
pao [DAWN],  — 9:10 PM
sesbian lex
kenneth [ALOY],  — 9:14 PM
wuluwulu
pao [DAWN],  — 9:16 PM
https://seed-cunanan.netlify.app/
Sedroul — 9:16 PM
sarap
seed ni cunanan
Aina [HRZN],  — 9:29 PM
if(!productname  !category 
 !stockCount){
      alert("Please fill all required fields!")
      return;
    }
rama [ABYS],  — 9:36 PM
https://frontend-bookingina-ni-shi.vercel.app/
Sedroul — 9:36 PM
lala
Jims [TAP],  — 9:45 PM
CA-bugo
https://github.com/CA-bugo/frontexamsemis
GitHub
GitHub - CA-bugo/frontexamsemis
Contribute to CA-bugo/frontexamsemis development by creating an account on GitHub.
GitHub - CA-bugo/frontexamsemis
Aina [HRZN],  — 10:07 PM
//SQL
const connection = require("../config/db"); // fixed path

//Get all users
exports.getAllUsers = (req, res) => {
  connection.query("SELECT * FROM payslip", (err, rows) => {

userController.js
3 KB
﻿
//SQL
const connection = require("../config/db"); // fixed path

//Get all users
exports.getAllUsers = (req, res) => {
  connection.query("SELECT * FROM payslip", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

//Search a user by ID
exports.getUsersById = (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM payslip WHERE id=?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};

//CREATE USER
exports.createUser = (req, res) => {
  let { fname, pday, wday } = req.body;

  pday = parseFloat(pday) || 0;
  wday = parseFloat(wday) || 0;

  if (!fname || pday <= 0 || wday <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const total = pday * wday;

  connection.query(
    "INSERT INTO payslip (fname, pday, wday) VALUES (?,?,?)",
    [fname, pday, wday],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "User created successfully",
        userId: results.insertId,
        total: total,
      });
    },
  );
};

//UPDATE USER
exports.updateUser = (req, res) => {
  let { id, fname, pday, wday } = req.body;

  pday = parseFloat(pday) || 0;
  wday = parseFloat(wday) || 0;

  if (!fname || pday <= 0 || wday <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const total = pday * wday;

  connection.query(
    "UPDATE payslip SET fname=?, pday=?, wday=? WHERE id=?",
    [fname, pday, wday, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }

      if (results.affectedRows > 0) {
        res.json({
          message: "User updated successfully",
          total: total,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    },
  );
};

//DELETE USER
exports.deleteUser = (req, res) => {
  const id = req.body.id;

  connection.query("DELETE FROM payslip WHERE id=?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    if (results.affectedRows > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};
userController.js
3 KB
