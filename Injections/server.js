const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 3000;

// Database connection configuration (SQLite in this example)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite', // You can change the filename as needed
});

// Define a model (a simple "User" model in this example)
const User = sequelize.define('User', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
});

// Sync the model with the database (create the "User" table if it doesn't exist)
sequelize.sync().then(() => {
    console.log('Database is ready.');
});

// Middleware for JSON request body parsing
app.use(express.json());

// Define routes for SQL operations (CRUD)
// Create a new user
app.post('/users', async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.create({ username, email });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    const { id } = req.query
    try {
        const users = await User.findAll({
            where: {
                username: id || ''
            }
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});
// Get all users
app.get('/broken/users', async (req, res) => {
    const { id } = req.query
    try {
        const users = await sequelize.query(`SELECT * FROM Users AS User WHERE username = '${id}`);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Start the Express.js server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
