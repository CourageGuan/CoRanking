const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './database.db';

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50) NOT NULL
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Table `users` ready or already exists.');
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS matches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user0 INTEGER NOT NULL,
            user1 INTEGER NOT NULL,
            score0 INTEGER NOT NULL,
            score1 INTEGER NOT NULL,
            matchTime DATETIME NOT NULL
            )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Table `matches` ready or already exists.');
            }
        });
    }
});

module.exports = db;