const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    contactPerson: {
        type: String,
        required: [true, 'Contact person name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Official email is required'],
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number']
    },
    requirements: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['New', 'In Discussion', 'Partnered', 'Closed'],
        default: 'New'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Partner', partnerSchema);