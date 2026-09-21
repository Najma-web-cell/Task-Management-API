const { v4: uuidv4 } = require('uuid');
const { readTasks, writeTasks } = require('../models/taskModel');

// Create Task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const tasks = await readTasks();
    const now = new Date().toISOString();

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description || '',
      priority: ['Low', 'Medium', 'High'].includes(priority) ? priority : 'Medium',
      status: ['Pending', 'InProgress', 'Completed'].includes(status) ? status : 'Pending',
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      createdAt: now,
      updatedAt: now
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    next(error);
  }
};

// Get All Tasks (Pagination, Filter, Sort)
exports.getAllTasks = async (req, res, next) => {
  try {
    let tasks = await readTasks();

    // 1. Filtering by status
    const { status, sort, page = 1, limit = 10 } = req.query;
    if (status) {
      tasks = tasks.filter((t) => t.status.toLowerCase() === status.toLowerCase());
    }

    // 2. Sorting by dueDate
    if (sort) {
      tasks.sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
        return sort === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    // 3. In-memory Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const total = tasks.length;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedTasks = tasks.slice(startIndex, startIndex + limitNum);

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      data: paginatedTasks
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// Update Task
exports.updateTask = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const { title, description, priority, status, dueDate } = req.body;
    const existing = tasks[index];

    tasks[index] = {
      ...existing,
      title: title !== undefined ? title : existing.title,
      description: description !== undefined ? description : existing.description,
      priority: ['Low', 'Medium', 'High'].includes(priority) ? priority : existing.priority,
      status: ['Pending', 'InProgress', 'Completed'].includes(status) ? status : existing.status,
      dueDate: dueDate !== undefined ? new Date(dueDate).toISOString() : existing.dueDate,
      updatedAt: new Date().toISOString()
    };

    await writeTasks(tasks);
    res.status(200).json({ success: true, data: tasks[index] });
  } catch (error) {
    next(error);
  }
};

// Delete Task
exports.deleteTask = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const filteredTasks = tasks.filter((t) => t.id !== req.params.id);

    if (tasks.length === filteredTasks.length) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    await writeTasks(filteredTasks);
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};