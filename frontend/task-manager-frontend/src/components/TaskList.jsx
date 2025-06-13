import React from 'react';
import axios from 'axios';

const API_BASE = process.env.React_APP_API_URL || 'http://localhost:3000/api';

export default function TaskList({ tasks, setCurrentView, setSelectedTask, refreshTasks, }) {
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?:')) {
            return;
        }
        try{
            const res = await axios.delete(`${API_BASE}/tasks/${id}`);
            console.log('Deleted task, status:', res.status);
            await refreshTasks();
        }catch (err){
            console.error('Error Deleting Task:', err);
            alert(err.response?.data?.error || 'Delete failed');
        }
            
       };
    return (
        <div className='list-container'>
            <h1 className="list-heading">Task List</h1>
            <button 
                className="create-button"
                onClick={() => setCurrentView('create')} >Create New Task</button>
                {tasks.length === 0 ? (
                    <p>No task found.</p>
                ) : (
                
                <ul className="task-list">
                    {tasks.map(task => (
                        <li key={task.id} className="task-item">
                            <span className="task-title"
                            onClick={() => {
                                setSelectedTask(task);
                                setCurrentView('detail');
                            }}>
                                {task.title}</span>
                            <div className="task-actions">
                                <button
                                className="delete-btn"
                                onClick={() => handleDelete(task.id)}>Delete</button>
                                <button className="edit-btn"
                                onClick={() => {
                                    setSelectedTask(task);
                                    setCurrentView('edit');
                                }}>Edit</button>
                            </div>
                        </li>
                    ))}
                </ul>
                )}
        </div>
    );
}
