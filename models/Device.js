const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({     //unique: độc nhất, trim: bỏ space
    name: {type: String, required: [true, 'Name must be require']},
    type: {type: String, required: [true, 'Type of device must be require']},
    description: {type: String, default:""},
    userid: {type: String, required: [true, 'user Id must be require']}
}, {timestamps: true})

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;