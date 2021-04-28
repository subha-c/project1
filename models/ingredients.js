const mongoose = require("mongoose");

const IngredientsSchema = mongoose.Schema({
    ingredientName: {
        type: String,
        require: true,
        unique: true
    },
    availableQty: {
        type: Number,
        require: true
    },
    thresholdQty: {
        type: Number,
        require: true
    },
    vendor: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// export model  
module.exports = mongoose.model("ingredient", IngredientsSchema);
