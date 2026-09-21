const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const apiLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Request Logging
app.use('/api', apiLimiter); // Rate Limiting

// Routes
app.use('/api/tasks', taskRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});