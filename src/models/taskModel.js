const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../../data/tasks.json');

const readTasks = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, JSON.stringify([], null, 2));
      return [];
    }
    throw error;
  }
};

const writeTasks = async (tasks) => {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
};

module.exports = { readTasks, writeTasks };