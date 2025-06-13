import React from "react";

export default function TaskDetail({ task, setCurrentView }) {
    return (
        <div className="detail-container">
        <button className="back-button"
        onClick={() => setCurrentView('list')}>Back to List</button>
        <h1 className="detail-heading">{task.title}</h1>
        <p>{task.description || 'No description available.'}</p>
        <p><strong>Status: </strong>{''}
        <span className="detail-status">{task.status}</span></p>
        <p><strong>Due Date:</strong>{''} 
        <span className="detail-due">{new Date(task.due_date).toLocaleDateString()}</span></p>
    </div>
    );
};
