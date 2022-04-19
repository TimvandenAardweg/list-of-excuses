const asyncHandler = require('express-async-handler');

const Excuse = require('../models/excuseModel');

// @desc    Get excuses
// @route   GET /api/excuses
// @access  public
const getExcuses = asyncHandler(async (req, res) => {
    const excuses = await Excuse.find();

    res.status(200).json(excuses);
});

// @desc    Set excuse
// @route   POST /api/excuses
// @access  private
const setExcuse = asyncHandler(async (req, res) => {
    if(!req.body.excuse){
        res.status(400);
        throw new Error('Please add an excuse.');
    }

    const excuse = await Excuse.create({
        excuse: req.body.excuse,
        count: 1,
    });

    res.status(200).json(excuse);
});

// @desc    Update excuse
// @route   PUT /api/excuse/:id
// @access  private
const updateExcuse = asyncHandler(async (req, res) => {
    const excuse = await Excuse.findById(req.params.id);

    if(!excuse){
        res.status(400);
        throw new Error('Excuse not found.')
    }

    const updatedGoal = await Excuse.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedGoal);
});

// @desc    Delete excuse
// @route   DELETE /api/excuse/:id
// @access  private
const deleteExcuse = asyncHandler(async (req, res) => {
    const excuse = await Excuse.findById(req.params.id);

    if(!excuse){
        res.status(400);
        throw new Error('Excuse not found.')
    }

    await excuse.remove();

    res.status(200).json({ id: req.params.id })
});

module.exports = {
    getExcuses,
    setExcuse,
    updateExcuse,
    deleteExcuse,
}