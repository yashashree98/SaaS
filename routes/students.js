const express = require('express')
const router = express.Router()
const Student = require('../models/student')

async function getStudentID(req, res, next) {
    let student
    try {
        student = await Student.findById(req.params.id)
        if (student == null)
        {
            return res.status(404).send({message: 'Cannot find student'})
        }
    }
    catch (err){
        return res.status(500).send({message: err.message})
    }
    res.student = student
    next()
}

//Get all
router.get('/', async (req, res) => {
    try {
        const students = await Student.find()
        res.json(students)
    } 
    catch (err) {
        res.status(500).send({message: err.message})
    }
})

//Getting one
router.get('/:id', getStudentID, (req, res) => {
    res.send(res.student)
})

//Creating one
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        studentId: req.body.studentId,
        email: req.body.email,
        phone: req.body.phone
    })
    try{
        const newStudent = await student.save()
        res.status(201).send({ message: 'Sucessfully Created', newStudent });
    }
    catch(err)
    {
        res.status(400).send({ message: 'Error creating student', error: err.message });
    }
})

//Updating one
router.patch('/:id', getStudentID, async (req, res) => {
    if (req.body.name != null)
    {
        res.student.name = req.body.name
    }
    if (req.body.studentId != null)
    {
        res.student.studentId = req.body.studentId
    }
    if (req.body.email != null)
    {
        res.student.email = req.body.email
    }
    if (req.body.phone != null)
    {
        res.student.phone = req.body.phone
    }
    try {
        const updateStudent = await res.student.save()
        res.send(updateStudent)
    }
    catch (err) {
        res.status(400).send({ message: 'Error updating student', error: err.message });
    }
})

//Deleting one
router.delete('/:id', getStudentID, async (req, res) => {
    try {
        await res.student.deleteOne()
        res.send({ message: 'Successfully Deleted' });
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
})

module.exports = router