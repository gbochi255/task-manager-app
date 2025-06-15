const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { createTaskHandler, getTaskByIdHandler, getAllTasksHandler, updateTaskStatusHandler, deleteTaskHandler, } =
require('../controllers/TaskController')

const router = require("express").Router();

const validateTaskBody = [
    body('title').notEmpty().withMessage('Title is required'),
    body('due_date_time').isISO8601().withMessage('Due_date_time must be a valid ISO date'),
    body('status')
    .optional()
    .isIn(["pending", "in progress", "completed"]).withMessage('Status is required'),
    ];

    const validateTaskId = [param("id").isInt().withMessage("Task Id must be an integer"),];
    
    function handleValidationErrors(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            //return res.status(400).json({ error:errors.array() });
            const first = errors.array()[0];
            return res.status(400).json({ error: first.message });
        }
        next();
    }

    router.get('/', getAllTasksHandler);
    router.get('/:id', validateTaskId, handleValidationErrors, getTaskByIdHandler)

    /*router.get('/:id', validateTaskId, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        getTaskByIdHandler(req, res, next);
    });*/

router.post('/', validateTaskBody, handleValidationErrors, createTaskHandler);

router.put('/:id', [...validateTaskId, ...validateTaskBody], handleValidationErrors, updateTaskStatusHandler);

router.delete('/:id', validateTaskId, handleValidationErrors, deleteTaskHandler);

module.exports = router;