const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    role: {
        type: String,
        default: "user"
    },
    age: {
        type: Number,
        set: v => Math.round(v),
        min: 18,
        max: 80
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ["male", "female", "transgender"],
        required: true
    },
    salary: {
        type: Number,
        validate: {
            validator: function (v) {
                return v > 10000
            },
            message: "Salary should be at least 10,000/month"
        }
    },
    annualSalary: {
        type: Number,
        get: function () {
            return this.salary ? this.salary * 12 : null
        }
    }
});

module.exports = mongoose.model('user', userSchema)