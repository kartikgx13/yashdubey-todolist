import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from "./Create";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/api/get')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setTodos(data))
      .catch(err => console.log(err));
  }, []);  // Empty dependency array to only fetch data once on mount

  const handleEdit = (id) => {
    fetch(`/api/update/${id}`, {
      method: 'PUT',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Check if the response content type is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          // Handle non-JSON response (e.g., HTML error page)
          console.log('Non-JSON response:', response);
          return null; // or handle accordingly
        }
      })
      .then(result => {
        if (result !== null) {
          // Update the todos state directly without reloading the page
          setTodos(prevTodos => prevTodos.map(todo => (todo._id === id ? { ...todo, done: true } : todo)));
        }
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Check if the response content type is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          // Handle non-JSON response (e.g., HTML error page)
          console.log('Non-JSON response:', response);
          return null; // or handle accordingly
        }
      })
      .then(result => {
        if (result !== null) {
          // Update the todos state directly without reloading the page
          setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />

      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={index} className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
              ) : (
                <BsCircleFill className='icon' />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;


