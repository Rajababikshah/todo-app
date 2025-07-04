import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  // useEffect to run on component load
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTodos();
    }
  }, [token, navigate]);

  // Add a new todo
  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(
        "http://localhost:5000/api/todos",
        { text, completed: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        backgroundColor: "#fafafa",
      }}
    >
      <h2 style={{ textAlign: "center" }}>My Todo List</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a todo"
          style={{ flex: 1, padding: 10, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: 6,
              backgroundColor: "#fff",
            }}
          >
            <span>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo._id)}
              style={{
                background: "none",
                color: "red",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
