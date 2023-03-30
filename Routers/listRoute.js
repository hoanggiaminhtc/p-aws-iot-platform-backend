const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const deviceRoute = require('./deviceRoute');
const telemetryRoute = require('./telemetryRoute');
const topicRoute = require('./topicRoute');
const dashboardRoute = require('./dashboardRoute');
exports.route = (app) =>{
    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/user', userRoute);
    app.use('/api/v1/device', deviceRoute);
    app.use('/api/v1/device/telemetry', telemetryRoute);
    app.use('/api/v1/topic', topicRoute);
    app.use('/api/v1/dashboard', dashboardRoute);
}
