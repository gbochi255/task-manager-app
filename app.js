
const express = require("express");
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
//const db = require("./db/connection")

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
    res.status(400).json({ error: "Not found" });
})

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
})
/*const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
}*/

//app.use(errorHandler);
//app.use(handleCustomErrors);
//app.use(handlePsqlErrors);
//app.use(handleServerErrors);
//app.use(handleNotFoundErrors);

module.exports = app;