const pool = require('../db/connection');

const createTask = async ({ title, description, status, due_date }) => {
    const query = `INSERT INTO tasks (title, description, status, due_date) 
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [title, description, status, due_date];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const findTaskById = async (id) => {
    const query = ` SELECT * FROM tasks WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

const findAllTasks = async () => {
    const query = ` SELECT * FROM tasks`;
    const { rows } = await pool.query(query);
    return rows;
};

const updateTaskStatus = async (id, status) => {
    const query = ` UPDATE tasks SET status = $1, updated_at = CURRENT_TIMESTAMP 
    WHERE ID = $2 RETURNING *`;
    const { rows } = await pool.query(query, [status, id]);
    return rows[0];
};

const deleteTask = async (id) => {
    const query = ` DELETE FROM tasks WHERE id = $1`;
    await pool.query(query, [id]);
};
module.exports = {
    createTask,
    findTaskById,
    findAllTasks,
    updateTaskStatus,
    deleteTask
};