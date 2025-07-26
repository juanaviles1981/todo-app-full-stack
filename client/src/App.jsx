import { useEffect, useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  const API = "https://todo-app-full-stack-hd7e.onrender.com"

  //Cargar tareas
  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error cargando tareas:", err))
  }, [])

  // Agregar nueva tarea
  const handleAdd = async () => {
    if (newTask.trim() === "") return

    const res = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTask })
    })

    if (res.ok) {
      const data = await res.json()
      setTasks([...tasks, data])
      setNewTask("")
    }
  }

  // Eliminar tarea
  const handleDelete = async (id) => {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "DELETE"
    })

    if (res.ok) {
      setTasks(tasks.filter(task => task._id !== id))
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ToDo List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          placeholder="Nueva tarea"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAdd}>Agregar</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => handleDelete(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
