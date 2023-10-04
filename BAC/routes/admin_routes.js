const { authenticateToken } = require('../modules/jwt')

const router = require('express').Router()
const fs = require('fs')
const css = `<style>
/* Basic styling for the sidebar and content area */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}
.sidebar {
    background-color: #333;
    color: #fff;
    width: 250px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px;
}
.content {
    margin-left: 270px;
    padding: 30px;
}
/* Style the navigation links */
.sidebar a {
    text-decoration: none;
    color: #fff;
    display: block;
    margin-bottom: 10px;
}
.sidebar a:hover {
    background-color: #555;
}
</style>`


router.get('/dash', authenticateToken, (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Dashboard</title>
        ${css}
    </head>
    <body>
        <div class="sidebar">
            <h2>Admin Dashboard</h2>
            <a href="dash">Dashboard</a>
            <a href="users">Users</a>
            <a href="files">Files</a>
            <a href="/logout">logout</a>
        </div>
        <div class="content">
            <h1>Welcome to the Admin Dashboard. ${req.user.username}!</h1>
            <p>This is a simple admin dashboard. You can add more content and functionality as needed.</p>
        </div>
    </body>
    </html>
    `)
})

router.get('/users', authenticateToken, (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    ${css}
</head>
<body>
    <div class="sidebar">
        <h2>Admin Dashboard</h2>
        <a href="dash">Dashboard</a>
        <a href="users">Users</a>
        <a href="files">Files</a>
        <a href="/logout">logout</a>
    </div>
    <div class="content">
        <h1>Welcome to the Admin Dashboard. ${req.user.username}!</h1>
        <div> <h3>Users: </h3>
        <div>jeb admin</div>
        <div>pat user</div>
        <div>mike user</div></div>
       
    </div>
</body>
</html>
`)
})
router.use(authenticateToken, (req, res, next) => {
    if (req.user.admin) {
        next()
    } else {
        return res.sendStatus(401)
    }
})

router.get('/files', authenticateToken, (req, res) => {
    var files = fs.readdirSync('./')
    var filesString = '<div>'
    for (const file of files) {
        filesString += file + "</div><div>"
    }
    filesString += '</div>'
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Dashboard</title>
        ${css}
    </head>
    <body>
        <div class="sidebar">
            <h2>Admin Dashboard</h2>
            <a href="dash">Dashboard</a>
            <a href="users">Users</a>
            <a href="files">Files</a>
            <a href="/logout">logout</a>
        </div>
        <div class="content">
            <h1>Welcome to the Admin Dashboard. ${req.user.username}!</h1>
            <div> <h3>files: </h3>
            ${filesString}
           
        </div>
    </body>
    </html>
    `)
})



module.exports = {
    admin_router: router
}