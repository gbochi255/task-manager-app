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
    .isIn(["pending", "in_progress", "completed"]).withMessage('Status is required'),
    ];

    const validateTaskId = [param("id").isInt().withMessage("Task Id must be an integer"),];
    
    //const { validationResult } =require('express-validator');
    function handleValidationErrors(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            
            const first = errors.array()[0].message;
            return res.status(400).json({ error: first.msg });
        }
        next();
    }

    router.get('/', getAllTasksHandler);
    router.get('/:id', validateTaskId, handleValidationErrors, getTaskByIdHandler)

    

router.post('/', validateTaskBody, handleValidationErrors, createTaskHandler);

router.put('/:id', [...validateTaskId, ...validateTaskBody], handleValidationErrors, updateTaskStatusHandler);

router.delete('/:id', validateTaskId, handleValidationErrors, deleteTaskHandler);

module.exports = router;