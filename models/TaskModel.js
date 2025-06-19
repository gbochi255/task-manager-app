const pool = require('../db/connection');

async function  createTask({ title, description, status, due_date_time }) {
    const result = await pool.query( 
        `INSERT INTO tasks (title, description, status, due_date_time) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, title, description, status, due_date_time `,
    [title, description, status, due_date_time]
    );
    return result.rows[0];
};

async function findTaskById(id) {
    const result = await pool.query(` SELECT * FROM tasks WHERE id = $1` [id]);
    return result.rows[0] || null;
};

async function findAllTasks() {
    const result = await pool.query(`SELECT * FROM tasks ORDER BY due_date_time ASC`);
    return result.rows;
};

async function updateTaskStatus(id, status) {
    const result = await pool.query(`UPDATE tasks 
        SET status = $1 WHERE id = $2  
        RETURNING *`, [status, id]);
        return result.rows[0] || null;
};

async function deleteTask(id) {
    const result = await pool.query(` DELETE FROM tasks WHERE id = $1`, [id]);
    return result.rowCount > 0;
};
module.exports = {
    createTask,
    findTaskById,
    findAllTasks,
    updateTaskStatus,
    deleteTask,
};