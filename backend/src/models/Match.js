const db = require('./db')

class Match {
    static getAll(callback) {
        db.all('SELECT * FROM matches', [], (err, rows) => {
            callback(err, rows);
        });
    }
   
    static create(user0, user1, score0, score1, matchTime, callback) {
        const sql = 'INSERT INTO matches (user0, user1, score0, score1, matchTime) VALUES (?, ?, ?, ?, ?)';
        db.run(sql, [user0, user1, score0, score1, matchTime], (err) => {
            callback(err, { id: this.lastID, user0: user0, user1: user1, score0: score0, score1: score1, matchTime: matchTime });
        });

    }
}

module.exports = Match;