const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
        match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'],
        unique: true // Prevents duplicate registrations
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        unique: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    qualification: {
        type: String,
        required: [true, 'Qualification is required']
        // This will store either the selected dropdown value or the "Other" manual entry
    },
    passingYear: {
        type: Number,
        required: [true, 'Passing year is required']
    },
    collegeName: {
        type: String,
        required: [true, 'College name is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Assessment Scheduled', 'Placed', 'Rejected'],
        default: 'New'
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Student', studentSchema);