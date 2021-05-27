const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: 'User',
        },
        items: {
            type: Array,
        },
        stateOrder: {
            type: String,
            default: '0', //  { 0 : "shipped" ,  1 : "delivered" }
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', orderSchema);
