const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const tasksRoutes = require('./routes/tasks')
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager', {
    
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

// Routes
app.use('/api/v1/tasks', tasksRoutes);


// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Task Manager API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});