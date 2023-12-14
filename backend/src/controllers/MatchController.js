const Match = require('../models/Match');
const User = require('../models/User');

class MatchController {
    async createMatch(req, res) {
        if (req.body.user0 === req.body.user1) {
            return res.status(400).json({ error: 'User must be different.' });
        }
        User.getById(req.body.user0, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else if (user === null) {
                return res.status(400).json({ error: 'User does not exist.' });
            }
        });
        User.getById(req.body.user1, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else if (user === null) {
                return res.status(400).json({ error: 'User does not exist.' });
            }
        });
        if (req.body.score0 < 0 || req.body.score1 < 0) {
            return res.status(400).json({ error: 'Score must be positive.' });
        }
        const matchTime = new Date(req.body.matchTime);
        if (matchTime.toString() === 'Invalid Date') {
            return res.status(400).json({ error: 'Invalid date.' });
        }
        Match.create(req.body.user0, req.body.user1, req.body.score0, req.body.score1, matchTime, (err, match) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else {
                return res.status(201).json(match);
            }
        });
    }

    async getMatches(req, res) {
        Match.getAll((err, matches) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else {
                return res.status(200).json(matches.map(match => {
                    return {
                        id: match.id,
                        user0: match.user0,
                        user1: match.user1,
                        score0: match.score0,
                        score1: match.score1,
                        matchTime: new Date(match.matchTime)
                    }
                }));
            }
        });
    }
}

module.exports = new MatchController();