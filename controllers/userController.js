//SQL
const connection = require('../config/db'); // fixed path

//Get all users
exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM payslip', (err, rows) => {
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
    connection.query('SELECT * FROM payslip WHERE id=?', [id], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ message: 'User not found' });
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
        'INSERT INTO payslip (fname, pday, wday, total) VALUES (?,?,?,?)',
        [fname, pday, wday, total],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: 'User created successfully',
                userId: results.insertId,
                total: total
            });
        }
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
        'UPDATE payslip SET fname=?, pday=?, wday=?, total=? WHERE id=?',
        [fname, pday, wday, total, id],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }

            if (results.affectedRows > 0) {
                res.json({
                    message: 'User updated successfully',
                    total: total
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    );
};

//DELETE USER
exports.deleteUser = (req, res) => {
    const id = req.body.id;

    connection.query('DELETE FROM payslip WHERE id=?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

        if (results.affectedRows > 0) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
};