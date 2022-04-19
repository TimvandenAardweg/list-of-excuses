const express = require('express');
const router = express.Router();
const { getExcuses, setExcuse, updateExcuse, deleteExcuse } = require('../controllers/excusesController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getExcuses);
router.post('/', protect, setExcuse);
router.put('/:id', protect, updateExcuse);
router.delete('/:id', protect, deleteExcuse);

module.exports = router;