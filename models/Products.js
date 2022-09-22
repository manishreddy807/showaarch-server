const mongoose = require("mongoose")

const showaarchProduct = mongoose.Schema({
    image:{
       type: String,
       required: true, 
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('showaarchProducts', showaarchProduct)