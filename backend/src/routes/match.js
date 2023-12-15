const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/MatchController');

router.get('/', MatchController.getMatches);
router.post('/', MatchController.createMatch);

module.exports = router;