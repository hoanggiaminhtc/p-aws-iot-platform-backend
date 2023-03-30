const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    //unique: độc nhất, trim: bỏ space
    deviceId: { type: String, required: [true, "deviceId must be require"] },
    //title: {type: String, required: [true, "Type of device must be require"]},
    topicname: { type: String, required: [true, "topic name must be require"] },
    idUser: { type: String },
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
