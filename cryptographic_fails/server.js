const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();
const portHTTP = 80;
const portHTTPS = 443;

const crypto = require('crypto')

// HTTP server
const httpServer = http.createServer(app);

// HTTPS server
const httpsOptions = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
};
const httpsServer = https.createServer(httpsOptions, app);

app.get('/', (req, res) => {
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
       <div> YOUR KEY IS ${crypto.randomBytes(64).toString('hex')}</div>
    </body>
    </html>`);
});

// Start HTTP server
httpServer.listen(portHTTP, () => {
    console.log(`HTTP server is running on port ${portHTTP}`);
});

// Start HTTPS server
httpsServer.listen(portHTTPS, () => {
    console.log(`HTTPS server is running on port ${portHTTPS}`);
});
