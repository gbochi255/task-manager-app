import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, setCurrentView, setSelectedTask, refreshTasks }) => {
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?:')) {
            axios.delete(`http://localhost:3000/tasks/${id}`)
            .then(() => refreshTasks())
            .catch(error => console.error('Error deleting tasks:', error));
        }
    };
    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Task List</h1>
            <button 
                className='mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600-'
                onClick={() => setCurrentView('create')} >Create New Task</button>
                <ul className='space-y-2'>
                    {tasks.map(task => (
                        <li key={task.id} className='flex justify-between items-center p-2 border-b'>
                            <span className='cursor-pointer text-blue-500 hover:underline'
                            onClick={() =>{
                                setSelectedTask(task);
                                setCurrentView('detail');
                            }}>{task.title}</span>
                            <div>
                                <button
                                className='text-red-500 mr-2'
                                onClick={() => handleDelete(task.id)}>Delete</button>
                                <button className='text-blue-500'
                                onClick={() => {
                                    setSelectedTask(task);
                                    setCurrentView('edit');
                                }}>Edit</button>
                            </div>
                        </li>
                    ))}
                </ul>
        </div>
    );
};
export default TaskList;