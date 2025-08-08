import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const API = "https://todo-app-full-stack-hd7e.onrender.com";

  // Cargar tareas
  useEffect(() => {
    fetch(`${API}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando tareas:", err);
        setIsLoading(false);
      });
  }, []);

  // Agregar nueva tarea
  const handleAdd = async () => {
    if (newTask.trim() === "") return;

    const res = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTask }),
    });

    if (res.ok) {
      const data = await res.json();
      setTasks([...tasks, data]);
      setNewTask("");
    }
  };

  // Eliminar tarea
  const handleDelete = async (id) => {
    const res = await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  // Marcar como completada
  const toggleTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });

    if (res.ok) {
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    }
  };

  // Guardar edición
  const handleEditSave = async (id) => {
    if (editText.trim() === "") return;
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText }),
    });
    if (res.ok) {
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
      setEditTaskId(null);
      setEditText("");
    }
  };

  // Manejar Enter en input principal
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 Mi Lista de Tareas</h1>
          <p className="text-gray-600">Organiza tu día de manera eficiente</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTask}
              placeholder="¿Qué necesitas hacer hoy?"
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              onClick={handleAdd}
              disabled={!newTask.trim()}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold rounded-lg"
            >
              ➕ Agregar
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              📋 Tus Tareas
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {tasks.length}
              </span>
            </h2>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Cargando tareas...</span>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">¡No tienes tareas pendientes!</h3>
                <p className="text-gray-600">Agrega una nueva tarea para comenzar</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      {editTaskId === task._id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleEditSave(task._id)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded"
                          autoFocus
                        />
                      ) : (
                        <span
                          className={`text-gray-800 font-medium ${
                            task.completed ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {task.text}
                        </span>
                      )}
                    </div>

                    {editTaskId === task._id ? (
                      <button
                        onClick={() => handleEditSave(task._id)}
                        className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Guardar
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditTaskId(task._id);
                            setEditText(task.text);
                          }}
                          className="ml-4 p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                          title="Editar tarea"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="ml-2 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          title="Eliminar tarea"
                        >
                          🗑️
                        </button>
                        <button
                          onClick={() => toggleTask(task._id)}
                          className={`ml-2 p-2 rounded-lg ${
                            task.completed
                              ? "text-green-600 hover:text-green-800 hover:bg-green-100"
                              : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-100"
                          }`}
                          title="Marcar como completada"
                        >
                          ✔️
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          💡 Presiona Enter para agregar una tarea rápidamente
        </div>
      </div>
    </div>
  );
}

export default App;
