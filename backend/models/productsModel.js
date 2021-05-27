const mongoose = require('mongoose');

// Products
const productsSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
        },
        Title: {
            type: String,
        },
        Category: {
            type: String,
        },
        Section: {
            type: String,
        },
        Brand: {
            type: String,
        },
        Price: {
            type: Number,
        },
        Color: {
            type: Array,
        },
        Size: {
            type: Array,
        },
        SDMemory: {
            type: Array,
        },
        SDHard: {
            type: Array,
        },
        MemoryRamMobiles: {
            type: Array,
        },
        MemoryRamLaptops: {
            type: Array,
        },
        ImageProduct: {
            type: String,
            required: [true, 'please image of product is required'],
        },
        Qty: {
            type: Number,
        },
        visibility: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Product', productsSchema);
