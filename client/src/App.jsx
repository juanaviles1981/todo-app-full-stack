import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  // Manejar Enter para agregar tarea
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Mi Lista de Tareas
          </h1>
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
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={handleAdd}
              disabled={!newTask.trim()}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  ¡No tienes tareas pendientes!
                </h3>
                <p className="text-gray-600">
                  Agrega una nueva tarea para comenzar
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task, index) => (
                  <li
                    key={task._id}
                    className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span
                        className={`text-gray-800 font-medium ${
                          task.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="opacity-0 group-hover:opacity-100 ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 focus:opacity-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      title="Eliminar tarea"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => toggleTask(task._id)}
                      className={`ml-4 p-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        task.completed
                          ? "text-green-600 hover:text-green-800 hover:bg-green-100"
                          : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-100"
                      }`}
                      title="Marcar como completada"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
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
