const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    jobPosition: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    employer: {
        type: String,
        trim: true,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Job', JobSchema);
