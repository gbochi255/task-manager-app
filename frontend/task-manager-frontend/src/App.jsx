import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
    .then(response => {
      setTasks(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError('Failed to fetch tasks');
      setLoading(false);
    });
  }, []);

  const refreshTasks = () => {
    setLoading(true);
    axios.get('http://localhost:3000/tasks')
    .then(response => {
      setTasks(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError('Failed to fetch tasks');
      setLoading(false);
    });
  };
  if(loading) return <div className='loading-message'>loading...</div>;
  if(error) return <div className='error-message'>{error}</div>;

  return(
    <div className='app-container'>
      {currentView === 'list' && (
        <TaskList
        tasks={tasks}
        setCurrentView={setCurrentView}
        setSelectedTask={setSelectedTask}
        refreshTasks={refreshTasks}
        />
      )}
      {currentView === 'detail' &&(
        <TaskDetail
        task={selectedTask}
        setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'create' && (
        <TaskForm
        setCurrentView={setCurrentView}
        refreshTasks={refreshTasks}
        />
      )}
      {currentView === 'edit' && (
        <TaskForm
        task={selectedTask}
        setCurrentView={setCurrentView}
        refreshTasks={refreshTasks}
        />
      )}
    </div>
  );
};
export default App;
  
    



