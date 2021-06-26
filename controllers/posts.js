import MakeOrder from '../models/makeOrder.js';

import mongoose from 'mongoose';

export const getOrders = async(req,res) =>{
    try {
        const makeOrders = await MakeOrder.find();

        res.status(200).json(makeOrders);

    } catch (error) {
        res.ststus(404).json({message: error.message});
        
    }
}

export const makeOrder = async(req, res)=> {
    const order = req.body;

    const newOrder = new MakeOrder(order);

    try {
        await newOrder.save();
        res.ststus(201).json(newOrder);
        
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}

export const updateOrder = async (req, res) => {
    const { id: _id} = req.params;
    const order = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No order with that id');

   const updatedOrder = await MakeOrder.findByIdAndUpdate(_id, { ...order, _id}, { new: true });
   res.json(updatedOrder);
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No order with that id');
    await MakeOrder.findByIdAndRemove(id);
    res.json({message: 'Order deleted successfully'});
}


// export const likeOrder = async (req, res) => {
//     const {id} = req.params;
//     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No order with that id');
//     const order = await MakeOrder.findById(id);
//     const updatedOrder = await MakeOrder.findByIdAndUpdate(id, { likeCount: order.likeCount + 1}, { new: true});
//      res.json(updatedOrder);
// }
