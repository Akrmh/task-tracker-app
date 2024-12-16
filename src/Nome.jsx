import { Plus, Edit, Trash } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = () => {
    if (task.trim() === "") return;

    if (editingIndex !== null) {
      const updatedTasks = tasks.map((t, index) =>
        index === editingIndex ? task : t
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask("");
  };

  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Task Tracker</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md
           focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write a task"
        />
        <button
          onClick={handleAddTask}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none flex items-center"
        >
          <Plus size={16} className="mr-2" />
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="list-disc pl-5">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{task}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEditTask(index)}
                className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-yellow-600 focus:outline-none flex items-center"
              >
                <Edit size={16} className="mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none flex items-center"
              >
                <Trash size={16} className="mr-1" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;