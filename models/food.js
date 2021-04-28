const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema({
    foodName: {
        type: String,
        require: true
    },
    productionCost: {
        type: Number,
        require: true
    },
    sellingCost: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// export model user 
module.exports = mongoose.model("food", FoodSchema);
