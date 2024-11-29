import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ToDoList = () => {
  const [day, setDay] = useState(() => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[new Date().getDay()];
  });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return Array.isArray(savedTasks) ? savedTasks : [];
  });
  const [newTask, setNewTask] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk mengontrol dropdown

  // Add task
  const addTask = () => {
    if (newTask && taskTime) {
      setTasks((prevTasks) => {
        const newTasks = [
          ...prevTasks,
          {
            id: Date.now(),
            text: newTask,
            time: taskTime,
            status: "Incomplete",
            completed: false,
          },
        ];
        return newTasks.sort((a, b) => a.time.localeCompare(b.time));
      });
      setNewTask("");
      setTaskTime("");
    }
  };

  // Mark task as complete
  const markComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "Complete", completed: true } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this task?",
      icon: "warning",
      color: "white",
      background: "#011748",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter((task) => task.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
          background: "#011748",
          color: "white",
        });
      }
    });
  };

  // Edit task details
  const editTaskDetails = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;

    Swal.fire({
      title: "Edit Task Details",
      html: ` 
        <input id="editTaskName" class="swal2-input" placeholder="Task name" value="${taskToEdit.text}">
        <input id="editTaskTime" class="swal2-input" type="time" value="${taskToEdit.time}">
      `,
      background: "#011748",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      preConfirm: () => {
        const newTaskName = document.getElementById("editTaskName").value;
        const newTaskTime = document.getElementById("editTaskTime").value;

        if (!newTaskName || !newTaskTime) {
          Swal.showValidationMessage("Both fields are required!");
        }
        return { newTaskName, newTaskTime };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { newTaskName, newTaskTime } = result.value;

        setTasks(
          (prevTasks) =>
            prevTasks
              .map((task) =>
                task.id === id
                  ? { ...task, text: newTaskName, time: newTaskTime }
                  : task
              )
              .sort((a, b) => a.time.localeCompare(b.time))
        );

        Swal.fire({
          title: "Updated!",
          text: "Task details have been updated.",
          icon: "success",
          background: "#011748",
          color: "white",
        });
      }
    });
  };

  // Edit day
  const editDay = () => {
    Swal.fire({
      title: "Edit Day",
      input: "select",
      inputOptions: {
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
        Saturday: "Saturday",
        Sunday: "Sunday",
      },
      inputValue: day,
      showCancelButton: true,
      background: "#011748",
      color: "gray",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a day!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setDay(result.value);
        Swal.fire({
          title: "Updated!",
          text: `Day has been updated to ${result.value}.`,
          icon: "success",
          background: "#011748",
          color: "white",
        });
      }
    });
  };

  const addNewDay = () => {
    Swal.fire({
      title: "Add New Day",
      text: "Are you sure you want to start a new day? This will clear all tasks.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Start New Day",
      cancelButtonText: "Cancel",
      background: "#011748",
      color: "white",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setDay("");
        setTasks([]); // Mengosongkan daftar tugas
        Swal.fire({
          title: "New Day Started!",
          text: "Please select a new day.",
          icon: "success",
          background: "#011748",
          color: "white",
        });
      }
    });
  };

  // Save tasks to localStorage
  useEffect(() => {
    console.log("Saving tasks to localStorage:", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2
          style={{ fontFamily: "'Shadows Into Light', cursive" }}
          className="text-2xl font-semibold"
        >
          Tasks for {day}
        </h2>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
            className="bg-gradient-to-r from-blue-900 to-black text-white border-2 border-white px-3 py-1 rounded-md hover:bg-blue-600 hover:shadow hover:shadow-white"
          >
            📝 Edit Day
          </button>
          {isDropdownOpen && (
            <div className="absolute bg-white shadow-md rounded-md mt-2">
              <button
                onClick={editDay}
                className="block px-4 py-2 w-full text-left hover:bg-blue-100 text-black"
              >
                Edit Day
              </button>
              <button
                onClick={addNewDay}
                className="block px-4 py-2 w-full text-left hover:bg-blue-100 text-black"
              >
                Add New Day
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Input untuk menambahkan task */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Task name"
        className="w-full p-2 border border-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
      />
      <input
        type="time"
        value={taskTime}
        onChange={(e) => setTaskTime(e.target.value)}
        className="w-full p-2 border border-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
      />
      <button
        onClick={addTask}
        className="w-full bg-gradient-to-r from-blue-900 to-black text-white py-2 px-4 border-2 rounded-md shadow-md hover:bg-blue-600"
      >
        Add Task
      </button>

      {/* Daftar Task */}
      <div className="mt-4 p-2 border-2 border-black bg-white rounded-md text-black">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-center px-4 py-2 mb-2 rounded-md shadow-md ${
              task.completed ? "bg-blue-800" : "bg-blue-400"
            }`}
          >
            <div>
              <p
                className={`${task.completed ? "line-through text-white" : ""}`}
              >
                {task.text}
              </p>
              <p className="text-sm text-white">At: {task.time}</p>
              <p
                className={`text-sm font-bold ${
                  task.status === "Complete" ? "text-green-500" : "text-red-600"
                }`}
              >
                Status: {task.status}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editTaskDetails(task.id)}
                className="bg-gradient-to-r from-blue-900 to-black text-white px-3 py-1 rounded-md hover:shadow-lg hover:shadow-black transition-shadow duration-200"
              >
                Edit
              </button>
              {!task.completed ? (
                <button
                  onClick={() => markComplete(task.id)}
                  className="bg-blue-900 text-white px-3 py-1 rounded-md hover:shadow-lg hover:shadow-black transition-shadow duration-200"
                >
                  ✓
                </button>
              ) : (
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:shadow-lg hover:shadow-black transition-shadow duration-200"
                >
                  X
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
