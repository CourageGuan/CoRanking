const db = require('./db')

class User {
    static getAll(callback) {
        db.all('SELECT * FROM users', [], (err, rows) => {
            callback(err, rows);
        });
    }

    static getById(id, callback) {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            callback(err, row);
        });
    }

    static getByName(name, callback) {
        db.get('SELECT * FROM users WHERE name = ?', [name], (err, row) => {
            callback(err, row);
        });
    }

    static create(name, callback) {
        const sql = 'INSERT INTO users (name) VALUES (?)';
        db.run(sql, [name], (err) => {
            callback(err, { id: this.lastID, name: name });
        });
    }
}

module.exports = User;