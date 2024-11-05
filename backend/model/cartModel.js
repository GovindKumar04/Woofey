const mongoose = require("mongoose");

const cartItem = new mongoose.Schema({
    foodName:{
        type: String,
        required: true,
        trim: true
    },
    foodPrice:{
        type:Number,
        required: true
    }
})

module.exports = mongoose.model("cartitems", cartItem)