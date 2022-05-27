const mongoose = require("mongoose");
const validator = require("mongoose-validator");


const commandOutputSchema = new mongoose.Schema
    ({
        _id: String,
        commandOutput:
        {
            type: String,
            required: true,
        },
    })

module.exports = mongoose.model("Command", commandOutputSchema);
