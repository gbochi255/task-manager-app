const { createTask, findTaskById, findAllTasks, updateTaskStatus, deleteTask } = 
require('../models/TaskModel');


const createTaskHandler = async (req, res) => {
    console.log('createTaskHandler req.body =', req.body);
    const { title, description, status, due_date_time } = req.body;
    if(!title || !due_date_time) {
        return res.status(400).json({  error: "Title and due_date are required" });
    }
    try {
        const newTask = await createTask({ title, description, status, due_date_time });
        res.status(201).json(newTask);
    }catch(err) {
        console.error("Error in createTaskHandler", err);
        res.status(500).json({ error: 'Failed to create task' });
    }
};

const getTaskByIdHandler = async (req, res) => {
const id  = parseInt(req.params.id, 10);
try{
const task = await findTaskById(id);
if(!task) { 
    return res.status(404).json({ error: 'Task not found' });
}
res.json(task);
}catch (err) {
    console.error("Error in getTaskByIdHandler:", err)
    res.status(500).json({ error: 'Failed to fetch task' });
}
};

const getAllTasksHandler = async(req, res) => {
    try{
        const tasks = await findAllTasks();
        res.json(tasks);
    }catch (err) {
        console.error("Error in getAllTaskHandler:", err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

const updateTaskStatusHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: "Status is required" });
    }
    
    try {
        const updatedTask = await updateTaskStatus(id, status);
        if(!updatedTask) { 
            return res.status(404).json({ error: 'Task not found' });
        }
            return res.json(updatedTask);
        }catch (err) {
            console.error("Error in updateTaskStatusHandler:", err);
            res.status(500).json({ error: 'Failed to update task' });
        }
};
const deleteTaskHandler = async (req, res) => {
    const { id } = parseInt(req.params.id, 10);
    try{
        const success = await deleteTask(id);
        if (!success) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        res.status(204).send();
    }catch(err) {
        console.error("Error in deleteTaskHandler:", err);
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