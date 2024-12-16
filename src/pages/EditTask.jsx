import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedTask, setEditedTask] = useState("");

  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = storedTasks.find((task) => task.id === parseInt(id, 10));
    if (task) {
      setEditedTask(task.name);
    }
  }, [id]);

  const handleSave = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.map((task) =>
      task.id === parseInt(id, 10) ? { ...task, name: editedTask } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  return (
    <div className="w-screen h-[100vh] flex flex-col items-center mt-[40px]">
      <h1 className="text-[2rem] font-bold mt-[12vh] mb-[5vh]">Edit Task</h1>
      <input
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
        placeholder="Edit your task"
        className="w-[35vw] h-[40px] p-3 m-4 rounded-[8px] border-solid border-[1px] border-gray-300 focus:outline-none"        
      />
      <button
        onClick={handleSave}
        className="w-[35vw] h-[40px] text-white bg-blue-700 hover:bg-blue-800 rounded-[8px]"
        >
        Save
      </button>
    </div>
  );
};

export default EditTask;
