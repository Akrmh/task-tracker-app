import { Box, Edit, Plus, Trash2 } from "lucide-react";
import moment from "moment";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState("");
  const navigate = useNavigate();
  const createdDate = moment().format("Do MMM YYYY")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = { id: tasks.length + 1, name: taskInput, createdDate : createdDate};
      setTasks([newTask,...tasks]);
      setTaskInput("");
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const editTask = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <div className="h-[100vh] w-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-[2.3rem] font-sans font-bold text-gray-800 mt-[12vh] mb-[5vh]">
        Task Tracker
      </h1>
      <div className="gap-4 flex max-sm:flex-col p-10 max-sm:items-center">
        <input
          required={"required"}
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-[38vw] h-[40px] max-sm:w-[80vw] p-4 border-[1px] bg-gray-100 border-gray-400 rounded-md focus:outline focus:outline-gray-300 focus:outline-offset-2"
          placeholder="Write a task"
        />
        <button
          onClick={addTask}
          className="text-white bg-blue-700 hover:bg-blue-800 w-[6vw] max-sm:w-[16vw] h-[40px] flex items-center justify-center rounded-[8px]"
        >
          <Plus size={25} className="mr-2" />
          Add
        </button>
      </div>

      {tasks.length === 0 && (
        <div
          className="text-[.8rem] text-gray-700 h-[30vh] w-[30vw] flex flex-col items-center justify-center gap-[10px]"
          id="noTask"
        >
          <Box size={35} />
          <p>No tasks yet!</p>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4 w-[45vw] max-sm:w-[80vw]">
        {tasks.map(({ id, name }) => (
          <div
            key={id}
            className="w-full h-[10vh] p-[20px] bg-white flex items-center text-[.8rem] justify-between rounded-[8px] border-solid border-[2px] border-gray-200"
          >
            <div>
            <p>{name}</p>
            <small className="text-gray-400">This task created at: {createdDate}</small>
            </div>
            <div className="flex gap-x-2">
              <button onClick={() => editTask(id)}>
                <Edit size={18} color="blue" />
              </button>
              <button onClick={() => deleteTask(id)}>
                <Trash2 size={18} color="red" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
