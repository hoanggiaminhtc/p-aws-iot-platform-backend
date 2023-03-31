const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.APP_PORT || 5000;
const {route} = require("./Routers/listRoute");
const { connectDB } = require('./database/dataBase');
const cors = require("cors");
const Telemetry = require("./models/Telemetry");
const logger = require("./AppLog/logger")
require('dotenv').config()
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


route(app);
app.use('*', (err, req, res, next) => {
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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    logger.info('User connected')
    socket.on('chat message', async msg => {
        const mess = await Telemetry.find({topic:msg}).limit(1).sort({_id: -1})
        logger.info(mess[0].value)
    io.emit('chat message', mess[0].value);
    });
    socket.on('disconnect', () => {
        logger.info('User disconnected');
    });
});

http.listen(port, () => {
    logger.info(`server running at http://localhost:${port}/`);
});
