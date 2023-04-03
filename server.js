const express = require("express");
const app = express();
const port = process.env.APP_PORT || 5000;
const {route} = require("./Routers/listRoute");
const { connectDB } = require('./database/dataBase');
const cors = require("cors");
const logger = require("./AppLog/logger")
require('dotenv').config()
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


route(app);
app.use('*', (err, req, res,next) => {
    const message = err.message || "Server is not respond";
    const status = err.status || 500;
    res.status(status).json({message});
})
app.get('/heathcheck',(req, res) =>{
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': 2
    });
    res.write('OK');
    res.end();
})

app.listen(port, () => {
    logger.info(`server running at http://localhost:${port}/`);
});
