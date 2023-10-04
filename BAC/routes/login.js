const { generateAccessToken, authenticateToken } = require('../modules/jwt')

const router = require('express').Router()



router.get('/login', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Page</title>
    </head>
    <body>
        <h1>Login</h1>
        <form action="login" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="user" name="user" required>
            <br>
            <input type="submit" value="Login">
        </form>
    </body>
    </html>
    `)
})

router.post('/login', (req, res) => {
    if (!req.body?.user) {
        return res.sendStatus(404).send('Unable to find user')
    }
    var user = { admin: req.body.user === 'jeb', username: req.body.user }
    res.cookie('token', generateAccessToken(user))



    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>Welcome Page</title>
    </head>
    <body>
        <h1>Welcome</h1>
        <p>Welcome to our website ${req.body.user}. We're glad you're here!</p>
        ${user.admin ? `<p>You are an admin</p>` : `<p>You are an user</p>`}
    </body>
    </html>`)
})
router.get('/logout', authenticateToken, (req, res) => {


    res.clearCookie('token')

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="refresh" content="2;url=/login">
        <title>Logout Page</title>
    </head>
    <body>
        <h1>Logout</h1>
        <p>You have been logged out. Redirecting to the home page in 2 seconds...</p>
    </body>
    </html>`)

})


module.exports = {
    login_router: router
}