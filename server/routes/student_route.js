const Student = require('./models/Student');

application.get('/api/students', async(req, res) =>{
    const students = await Student.find();
    res.json(students);
})