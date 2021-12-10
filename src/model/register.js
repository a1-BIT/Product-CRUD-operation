const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true,
        unique: true
    },
    user_type: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

// store the password in hash value (middleware)
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next();
});

//create model/collection
const Register = new mongoose.model('Register',userSchema);
module.exports = Register;