const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Product').then(()=>{
    console.log('Connection Succesful');
}).catch((err)=>{
    console.log(err);
})