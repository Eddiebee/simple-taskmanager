const fsPromises = require("fs/promises");
const path = require("path");
const tasksDB = {
  tasks: require("../model/tasks.json"),
  setTasks(tasks) {
    this.tasks = tasks;
  },
};

const getAllTasks = (req, res) => {
  res.json(tasksDB.tasks);
};

const addTask = (req, res) => {
  const { title, assignee, dueDate, difficulty } = req.body;
  if (!title || !assignee || !dueDate || !difficulty) {
    return res.status(400).json({
      message: "title, assignee, duedate and difficulty are required!",
    });
  }
  // we can go ahead and create the task then
  const newTask = { title, assignee, dueDate, difficulty };
  tasksDB.setTasks([...tasksDB.tasks, newTask]);
  // lets play bit with the filesystem ..yoh!
    await fsPromises.writeFile(path.join(__dirname, "..", "model", "tasks.json"))
};


