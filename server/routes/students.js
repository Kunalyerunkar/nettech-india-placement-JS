const router = require('express').Router();
const Student = require('../models/Student');

router.post('/register', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json({ success: true, data: savedStudent });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;