import React from "react";

const TaskDetail = ({ task, setCurrentView }) => {
    return (
        <div>
        <button className="mb-4 text-blue-500 hover:underline"
        onClick={() => setCurrentView('list')}>Back to List</button>
        <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
        <p className="mb-2">{task.description || 'No description'}</p>
        <p className="mb-2">Status: <span className="font-semibold">{task.status}</span></p>
        <p>Due Date: <span className="font-semibold">{new Date(task.due_date).toLocaleDateString()}</span></p>
    </div>
    );
};
export default TaskDetail;