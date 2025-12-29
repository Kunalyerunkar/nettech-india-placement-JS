const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        enum: ['General Inquiry', 'Student Registration', 'Hiring Partner Inquiry', 'Feedback']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    isResolved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);