import React, { useState } from "react";
import axios from "axios";

const API_BASE = process.env.React_APP_API_URL || 'http://localhost:4000/api';

export default function TaskForm({ task, setCurrentView, refreshTasks }) {
    const isEdit = Boolean(task);
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'pending',
        due_date_time: task 
        ? new Date(task.due_date_time).toISOString().slice(0,16)
        : new Date().toISOString().slice(0,16),
        });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({ ...formData, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!formData.title.trim().trim() || !formData.due_date_time) {
            setError('Title and due date are required.');
            return;
        }
        
        
            const payload = { 
                title: formData.title,
                description: formData.description,
                status: formData.status, 
                due_date_time: new Date(formData.due_date_time).toISOString(),
            };
            try {
            const url = isEdit 
            ? `${API_BASE}/tasks/${task.id}` 
            : `${API_BASE}/tasks`;

            
            let response; 
                if (isEdit) {
                response = await axios.put(url, payload);
                }else {
            response = await axios.post(url, payload);
        }
            setSuccessMessage(
                `Task ${isEdit ? 'updated' : 'created'} (status: ${response.status})`
            );
            await refreshTasks();
            setTimeout(() => setCurrentView('list'), 500);
        }catch (err) {
            console.error('Error saving task (raw):', err);
                const status = err?.response?.status;
                const data = err?.response?.data;
                console.error('Parsed error details:', JSON.stringify({ status, data }, null, 2));
            
            const backendError = 
            typeof data?.error === 'string'
            ? data.error 
            : Array.isArray(data?.errors)
            ? data.errors.map((e) => e.message).join('; ')
            : null;
        const message = backendError || err?.message || 'An unknown error occurred';
            
            setError(message);
        }
    };
    return (
        <div className="form-container">
            <button className="back-button"
            onClick={() => setCurrentView('list')}>Back to List</button>

            <h1 className="form-heading">{isEdit ? 'Edit Task' : 'Create Task'}</h1>

            <form className="form-fields"
            onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success">{successMessage}</div>}
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
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                <input type="datetime-local"
                name="due_date_time"
                value={formData.due_date_time}
                onChange={handleChange}
                className="form-input" required />
                
                <button type="submit" className="submit-button"
                >{isEdit ? 'Update' : 'Create'} Task</button>      
                </form>
            </div>
    );
};




