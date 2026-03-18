const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email_address: String,
    phone_number: String,
    home_address: String,
    city: String,
    state: String,
    zip_code: String,
}, {timestamps: true});

module.exports = mongoose.model("Student", studentSchema);