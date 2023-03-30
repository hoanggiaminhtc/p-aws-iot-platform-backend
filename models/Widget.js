const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({  
    name: {type: String, unique: true , required: [true, 'Name must be require']}, //Người dùng đặt khi tạo
    type: {type: String, required: [true, 'Type must be require']}, //Kiểu biểu đồ mặc định
    device: {type: String, required: [true, 'Device must be require']},// Chọn thiết bị
    topic: {type: String, required: [true, 'Topic must be require']},
    dashboard_id: {type: String, required: [true, 'Dashboard must be require']}
}, {timestamps: true})

const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;