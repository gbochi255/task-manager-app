const { createTask, findTaskById, findAllTasks, updateTaskStatus, deleteTask } = 
require('../models/TaskModel');

const createTaskHandler = async (req, res) => {
    const { title, description, status, due_date } = req.body;
    try {
        const newTask = await createTask({ title, description, status, due_date });
        res.status(201).json(newTask);
    }catch(err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

const getTaskByIdHandler = async (req, res) => {
const { id } = req.params;
try{
const task = await findTaskById(id);
if(!task) return res.status(404).json({ error: 'Task not found' });
res.json(task);
}catch (err) {
    req.status(500).json({ error: 'Failed to fetch task' });
}
};

const getAllTasksHandler = async(req, res) => {
    try{
        const tasks = await findAllTasks();
        res.json(tasks);
    }catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

const updateTaskStatusHandler = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedTask = await updateTaskStatus(id, status);
        if(!updatedTask) return res.status(404).json({ error: 'Task not found' });
            res.json(updatedTask);
        }catch (err) {
            res.status(500).json({ error: 'Failed to update task' });
        }
};
const deleteTaskHandler = async (req, res) => {
    const { id } = req.params;
    try{
        await deleteTask(id);
        res.status(204).send();
    }catch(err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};
module.exports = { 
    createTaskHandler, 
    getTaskByIdHandler, 
    getAllTasksHandler, 
    updateTaskStatusHandler, 
    deleteTaskHandler
};