
const express = require("express");
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

//app.use((req, res) => {
 //   res.status(400).json({ error: "Not found" });
//})

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
})

module.exports = app;