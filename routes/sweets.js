console.log("✅✅✅ NEW SWEETS FILE LOADED! ✅✅✅");
const express = require('express');
const router = express.Router();

const Sweet = require('../models/Sweet');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/sweets
// @desc    Get all sweets
// @access  Protected (any logged-in user)
router.get('/', protect, async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json({ success: true, count: sweets.length, data: sweets });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/sweets
// @desc    Create a new sweet
// @access  Private (Admin only)
router.post('/', [protect, authorize('admin')], async (req, res) => {
  try {
    const newSweet = await Sweet.create(req.body);
    res.status(201).json({ success: true, data: newSweet });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/sweets/:id
// @desc    Update a sweet
// @access  Private (Admin only)
router.put('/:id', [protect, authorize('admin')], async (req, res) => {
  try {
    let sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ success: false, message: 'Sweet not found' });
    }

    sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: sweet });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/sweets/:id
// @desc    Delete a sweet
// @access  Private (Admin only)
router.delete('/:id', [protect, authorize('admin')], async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ success: false, message: 'Sweet not found' });
    }

    await sweet.deleteOne(); // Use deleteOne() method on the document

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;