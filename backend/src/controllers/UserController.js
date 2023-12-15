const User = require('../models/User');

class UserController {
  async createUser(req, res) {
    const name = req.body.name;

    if (name.length > 50) {
        return res.status(400).json({ error: 'Name must be less than 50 characters.'} );
    }

    User.create(req.body.name, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.status(201).json(user);
        }
    });
  }

  async getUsers(req, res) {
    User.getAll((err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.status(200).json(users);
        }
    });
  }
}

module.exports = new UserController();