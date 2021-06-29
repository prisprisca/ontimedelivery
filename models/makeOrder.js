import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
})

var MakeOrder = mongoose.model('MakeOrder', orderSchema);

export default MakeOrder;