const mongoose = require('mongoose')

const Student = new mongoose.Schema({
    name: { type: String, required: true } ,
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    //address: {},
    //passwrod: {},
    //accountBalance: {},
    //expenses: {},
    //budgetPlan: {},

})

module.exports = mongoose.model('Student', Student)