const express = require('express');

const app = express();
const port = 3000;



// Middleware for JSON request body parsing
app.use(express.json());
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}
app.use(errorHandler)
// Define routes for SQL operations (CRUD)
// Create a new user
app.get('/homepage', async (req, res, next) => {
    next(new Error('NO HOMEPAGE EXIST'))
});


// Start the Express.js server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
