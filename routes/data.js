
const express = require('express');
const { aggregateBlackoffer, aggregateIntensity, aggregateIntensitysector, aggregateBubble, } = require('../controller/mongodb'); // Replace with the actual path to your aggregateBlackoffer file
const { pagination } = require('../controller/pagnation');

const router = express.Router();

router.get('/api/alldata', aggregateBlackoffer);
router.get('/api/groupchart', aggregateIntensity);
router.get('/api/barchart', aggregateIntensitysector);
router.get('/api/bubble', aggregateBubble);
router.post('/api/pagination',pagination);

module.exports = router;
