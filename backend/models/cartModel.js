const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const schemaCart = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        itemsId: [
            {
                item: { type: Schema.Types.ObjectId, ref: 'Product' },
                qty: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Cart', schemaCart);
