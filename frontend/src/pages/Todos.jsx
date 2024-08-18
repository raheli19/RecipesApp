import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Todos.css";

const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  
  //holds the selected sorting order.
  const [sorting, setSorting] = useState("sequential");
  
  // holds the current search term.
  const [searchTerm, setSearchTerm] = useState("");

  //holds the title of the new task being written
  const [newTodoTitle, setNewTodoTitle] = useState("");
  
  const { userId } = useParams();

  //The useEffect function runs whenever the user changes. 
  //If a user is logged in, it calls the fetchTodos function.
  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  //This function performs a GET request to the server and returns all tasks
  //It filters the tasks by userId and updates the todos state.
  //The tasks are also saved to localStorage.
  const fetchTodos = () => {
    fetch("http://localhost:3006/todos")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter(t => t.userId === parseInt(userId, 10));
        setTodos(data);
        localStorage.setItem("todos", JSON.stringify(data));
      });
  };

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  //This func adds a new task to the task list
  const handleAddTodo = () => {
    //checks if the new task title is not empty
    if (newTodoTitle.trim() === "") return;
    //calculates the new task ID 
    const newId = todos.length ? (Math.max(...todos.map(todo => parseInt(todo.id, 10))) + 1).toString() : "1";
    const newTodo = {
      userId: parseInt(user.id, 10),
      id: newId,
      title: newTodoTitle,
      completed: false
    };

    //adds the task to the server
    fetch("http://localhost:3006/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
    //updates the todos state and clears the new task input field
    .then(response => response.json())
    .then(data => {
      const updatedTodos = [...todos, data];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setNewTodoTitle("");
    })
    .catch(error => {
      console.error("Error adding todo:", error);
    });
  };

  //This func deletes a task by its ID.
  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:3006/todos/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      //updates the todos state by filtering out the deleted task
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    })
    .catch(error => {
      console.error("Error deleting todo:", error);
    });
  };

  //This func toggles the completion status of a task
  const handleToggleComplete = (todo_id) => {
    const todoToUpdate = todos.find(todo => todo.id === todo_id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    //updates the task on the server and updates the todos state
    fetch(`http://localhost:3006/todos/${todo_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
    .then(response => response.json())
    .then(data => {
      const updatedTodos = todos.map(todo =>
        todo.id === todo_id ? data : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    })
    .catch(error => {
      console.error("Error updating todo:", error);
    });
  };

  //This func updates the title of a task
  const handleUpdateTodo = (id, newTitle) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    const updatedTodo = { ...todoToUpdate, title: newTitle };

    //updates the task on the server and updates the todos state
    fetch(`http://localhost:3006/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
    .then(response => response.json())
    .then(data => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? data : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    })
    .catch(error => {
      console.error("Error updating todo:", error);
    });
  };

  //Filters the tasks based on the search term
  const filteredTodos = todos
    .filter((todo) => {
      if (searchTerm === "") return true;
      if (todo.id.toString().includes(searchTerm) || 
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (todo.completed ? "completed" : "pending").includes(searchTerm.toLowerCase())) {
        return true;
      }
      return false;
    })
    //Sorts the tasks based on the selected sorting order
    .sort((a, b) => {
      switch (sorting) {
        case "sequential":
          return parseInt(a.id, 10) - parseInt(b.id, 10);
        case "completed":
          return b.completed - a.completed;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "random":
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

  return (
    <div className="todos-container">
      <h1 className="todos-title">My Tasks</h1>
      <div className="sorting-container">
        <select id="sorting" value={sorting} onChange={handleSortingChange}>
          <option value="sequential">Sequential</option>
          <option value="completed">Completed</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
        <input
          type="text"
          placeholder="Search Tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <hr />
      <div className="add-todo-container">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a new task"
          className="new-todo-input"
        />
        <button onClick={handleAddTodo} className="add-todo-button">Add Task</button>
      </div>
      <div className="todos-list">
        {filteredTodos.map((todo, index) => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              onChange={() => handleToggleComplete(todo.id)}
              style={{ accentColor: "#5d73e2" }}
              checked={todo.completed}
            />
            {todo.completed ? (
              <span>
                <s>{index + 1}. {todo.title}</s>
              </span>
            ) : (
              <span>{index + 1}. {todo.title}</span>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">
            </button>
            <button onClick={() => {
              const newTitle = prompt("Enter new title:", todo.title);
              if (newTitle) {
                handleUpdateTodo(todo.id, newTitle);
              }
            }} className="edit-button">
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
