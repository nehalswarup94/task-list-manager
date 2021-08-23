import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    }
    getTasks();
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data
  }

  //Add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    setTasks([data, ...tasks]);
    // const id= Math.floor(Math.random() * 10000)+1;
    // console.log(Math.floor(Math.random() * 10000)+1);
    // const newTask={id, ...task}
    //   setTasks([newTask,...tasks]);
    //   console.log(tasks)
  }

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    let updatedTasks = tasks.filter(el => el.id !== id);
    setTasks(updatedTasks)

  }

  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updated = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updated)
    });
    const data = await res.json();
    setTasks(tasks.map(el => el.id === id ? { ...el, reminder: data.reminder } : el));
  }
  return (
    <Router>
      <div className="App">
        <Header title='Task Manager' show={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />

        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : (
              'No Tasks to show'
            )}
          </>
        )}/>
      <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
