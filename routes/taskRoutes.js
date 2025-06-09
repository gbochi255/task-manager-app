const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { createTaskHandler, getTaskByIdHandler, getAllTasksHandler, updateTaskStatusHandler, deleteTaskHandler } =
require('../controllers/TaskController')

const router = require("express").Router();

const validateTaskBody = [
    body('title').notEmpty().withMessage('Title is required'),
    body('due_date').notEmpty().withMessage('Due date must be a valid date'),
    body('status')
    .optional()
    .isIn(["pending", "in progress", "completed"]).withMessage('Status is required'),
    ];

    const validateTaskId = [param("id").isInt().withMessage("Task Id must be an integer"),];

    router.get('/', getAllTasksHandler);

    router.get('/:id', validateTaskId, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        getTaskByIdHandler(req, res, next);
    });

router.post('/', validateTaskBody, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    createTaskHandler(req, res, next);
});

router.put('/:id', [...validateTaskId, ...validateTaskBody], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    updateTaskStatusHandler(req, res, next);
});

router.delete('/:id', validateTaskId, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    deleteTaskHandler(req, res, next);
});

module.exports = router;