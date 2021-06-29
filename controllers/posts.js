// import express from 'express';
import MakeOrder from "../models/makeOrder.js";

import mongoose from "mongoose";

export const getOrders = async (req, res) => {
  try {
    const makeOrders = await MakeOrder.find();

    res.status(200).json(makeOrders);
  } catch (error) {
    res.ststus(404).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await MakeOrder.findById(id);

    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const makeOrder = async (req, res) => {
  const order = req.body;

  const newMakeOrder = new MakeOrder({
    ...order,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newMakeOrder.save();
    res.ststus(201).json(newMakeOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id: _id } = req.params;
  const order = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No order with that id");

  const updatedOrder = await MakeOrder.findByIdAndUpdate(
    _id,
    { ...order, _id },
    { new: true }
  );
  res.json(updatedOrder);
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No order with that id: ${id}`);
  await MakeOrder.findByIdAndRemove(id);
  console.log("DELETE");
  res.json({ message: "Order deleted successfully" });
};
