const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
    },
    productDescription: {
        type: String
    }
})


//create model/schema
const ProductRegister = mongoose.model('ProductRegister', productSchema);
module.exports = ProductRegister;