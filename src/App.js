import React, { useState, useEffect } from 'react';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');

  // Retrieve tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newTask === '' || newTime === '') {
      alert('Please fill in both the task and time fields');
      return;
    }

    // Create a new task object
    const newTaskObj = {
      id: Math.random(), // unique id for each task
      text: newTask,
      time: newTime,
      completed: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Update the tasks list with the new task
    setTasks([...tasks, newTaskObj]);

    // Clear the input fields
    setNewTask('');
    setNewTime('');
  };

  const handleDelete = (id) => {
    // Delete a task by its id
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleToggle = (id) => {
    // Toggle the 'completed' status of a task by its id
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
          />
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            placeholder="Add time"
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <span>
                {task.text} at {task.time}
              </span>
              <span style={{ fontSize: '12px', color: '#fff' }}>
                {task.timestamp}
              </span>
              <button onClick={() => handleDelete(task.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
