
const jwt = require('jsonwebtoken');

function generateAccessToken(json) {
    return jwt.sign(json, process.env.TOKEN);
}
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] || req.cookies?.token

    if (token == null || !token) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}