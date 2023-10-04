const TOKEN = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'
process.env.TOKEN = TOKEN
const express = require('express')
const app = require('express')()



const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));




const { login_router } = require('./routes/login')
const { admin_router } = require('./routes/admin_routes')



app.get('/', function (req, res) {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home Page</title>
        <style>
            /* Basic styling for the login button */
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin: 0;
                padding: 0;
            }
            .login-button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                font-weight: bold;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .login-button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to Our Website</h1>
        <p>Explore our website and discover amazing content!</p>
        <a href="login" class="login-button">Login</a>
    </body>
    </html>
    `)
})

app.use(login_router)
app.use('/admin', admin_router)


app.listen(8080, () => {
    console.log('listening on port 8080')
})