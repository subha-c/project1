const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    item: [{
        itemName: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    orderBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// export model user 
module.exports = mongoose.model("order", OrderSchema);
