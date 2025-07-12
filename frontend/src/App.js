import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import TaskList from './components/TaskList';


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      console.log('Making request to:', `${API_URL}/tasks`); // Add this line
      const response = await axios.post(`${API_URL}/tasks`, newTask);
      setTasks([response.data, ...tasks]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update task
  const updateTask = async (id, updates) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
      setTasks(tasks.map(task =>
        task._id === id ? response.data : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <p>A simple MERN stack application</p>
      </header>

      <main className="container">
        <div className="task-form">
          <h2>Add New Task</h2>
          <form onSubmit={addTask}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Task description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </form>
        </div>
        <div className="task-list">
          <h2>Your Tasks</h2>
          {loading ? (
            <p>Loading tasks...</p>
          ) : (
            <TaskList
              tasks={tasks}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
