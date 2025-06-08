import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ task, setCurrentView, refreshTasks }) => {
    const [formData, setFormData] = useState(task || { title: '', description: '', status: 'pending', due_date: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const method = task ? 'put' : 'post';
        const url = task ? `http://localhost:3000/tasks/${task.id}` : `http://localhost:3000/tasks`;
    axios[method](url, formData)
        .then(() => {
            refreshTasks();
            setCurrentView('list');
        })
        .catch(error => console.error('Error saving task:', error));
    };
    return (
        <div className="form-container">
            <button className="back-button"
            onClick={() => setCurrentView('list')}>Back to List</button>
            <h1 className="form-heading">{task ? 'Edit Task' : 'Create Task'}</h1>
            <div className="form-fields">
                <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="form-input"
                required />
                <textarea 
                name="description" 
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="form-textarea" />
                <select 
                name="status" 
                value={formData.status}
                onChange={handleChange}
                className="form-select">
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <input type="datetime-local"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="form-input" required />
                <button className="submit-button"
                onClick={handleSubmit}>{task ? 'Update' : 'Create'} Task</button>
            </div>
        </div>
    );
};
export default TaskForm;
