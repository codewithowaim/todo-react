import { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (inputValue.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = inputValue;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, inputValue]);
    }

    setInputValue("");
  };
  
  const handleDelete = (index) => {
    const filtered = tasks.splice(index, 1);
    setTasks(filtered);
    if (editIndex === index) setEditIndex(null);
  };

  const handleEdit = (index) => {
    setInputValue(tasks[index]);
    setEditIndex(index);
  };

   const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddOrUpdate(); // ✅ add by Enter key
  };

  return (
   <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(145deg, #1e1f25, #2a2c34)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "70px",
        color: "#f5f5f5",
        transition: "0.3s ease",
        borderRadius: "20px" ,
        boxShadow:" 0px 0px 20px 1px rgba(255, 255, 255, 0.05)",
      }}
    >
      <h1
        style={{
          fontSize: "2.3rem",
          fontWeight: "600",
          color: "#e5e7eb",
          letterSpacing: "1px",
          marginBottom: "25px",
        }}
      >
        📋Todo List
      </h1>

      {/* Input Section */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          padding: "18px 20px",
          borderRadius: "14px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          display: "flex",
          gap: "10px",
          width: "360px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress} 
          placeholder="Add a new task..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #3c3f4b",
            background: "#2d2f36",
            color: "#f3f4f6",
            fontSize: "0.95rem",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #6366f1")}
          onBlur={(e) => (e.target.style.border = "1px solid #3c3f4b")}
        />

        <button
          onClick={handleAddOrUpdate}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            background: editIndex !== null ? "#f59e0b" : "#6366f1",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background =
              editIndex !== null ? "#eab308" : "#4f46e5")
          }
          onMouseLeave={(e) =>
            (e.target.style.background =
              editIndex !== null ? "#f59e0b" : "#6366f1")
          }
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Task List */}
      <ul style={{ listStyle: "none", padding: 0, width: "380px" }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              background: "#2d2f36",
              marginBottom: "10px",
              padding: "14px 16px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #3a3d47",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              transition: "transform 0.2s ease, background 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.background = "#353741";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "#2d2f36";
            }}
          >
            <span style={{ fontSize: "1rem", color: "#e5e7eb" }}>{task}</span>
            <div>
              <button
                onClick={() => handleEdit(index)}
                style={{
                  background: "transparent",
                  border: "1px solid #6366f1",
                  color: "#a5b4fc",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  marginRight: "8px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#6366f1";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#a5b4fc";
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={{
                  background: "transparent",
                  border: "1px solid #ef4444",
                  color: "#fca5a5",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#ef4444";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fca5a5";
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p style={{ color: "#9ca3af", marginTop: "30px", fontSize: "0.95rem" }}>
          No tasks yet — stay focused. 💫
        </p>
      )}
    </div>
  );
}

export default TodoList;
