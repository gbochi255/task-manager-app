require('dotenv').config();
const app = require('./app');
const express = require('express');
const cors = require('cors');
//const app = express();

//require('dotenv').config();




const PORT = process.env.Port || 3000;
app.use(cors());
app.use(express.json());

/*let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = {id: Date.now(), ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.map((task => task.id === id ? { ...task, ...req.body }: task));
    res.status(200).json({ message: 'Task updated' });
})*/
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))