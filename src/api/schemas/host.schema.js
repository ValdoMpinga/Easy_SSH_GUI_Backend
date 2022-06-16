const mongoose = require("mongoose");
const validator = require("mongoose-validator");


const hostSchema = new mongoose.Schema
    ({
        _id: String,
        ip:
        {
            type: String,
            required: true,
            unique: true
        },
        login:
        {
            type: String,
            required: true,
        },
        password:
        {
            type: String,
            required: true,
        },
        connectionName:
        {
            type: String,
            required: true,
            unique: true
        }
    })

module.exports = mongoose.model("Host", hostSchema);
