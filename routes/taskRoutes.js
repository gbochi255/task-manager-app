const express = require('express');
const { body, params, validationResult } = require('express-validator');
const { createTaskHandler, getTaskByIdHandler, getAllTasksHandler, updateTaskStatusHandler, deleteTaskHandler } =
require('../controllers/TaskController')

const router = require("express").Router();




module.exports = apiRouter;