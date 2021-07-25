`--unhandled-rejections=strict`;
const Order = require("../models/orderModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
module.exports = {
  checkout: async (req, res) => {
    try {
      const { items } = req.body;

      //  TODO: no user so  create new order
      const newOrder = new Order({
        userId: ObjectId(req.user._id),
        items: items,
      });
      // TODO: speak with database must be use async & await
      return await newOrder.save(null, (err) => {
        console.log(err);
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        } else {
          console.log("Done!");
          return res.status(200).json({
            success: true,
            message: "created order 😁",
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  getOrders: async (req, res) => {
    try {
      return await Order.find({ userId: req.user._id })
        .exec()
        .then((resp) => {
          return res.status(200).json({
            success: true,
            message: resp,
          });
        })
        .catch((err) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: err.message,
            });
          }
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      return await Order.find()
        .exec()
        .then((resp) => {
          return res.status(200).json({
            success: true,
            message: resp,
          });
        })
        .catch((err) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: err.message,
            });
          }
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  editStateOfOrder: async (req, res) => {
    try {
      const { state } = req.body;
      const isOrder = await Order.find({ userId: req.user._id });
      if (!isOrder) {
        return res.status(400).json({
          success: false,
          message: "⚠ something Wrong...",
        });
      }

      await Order.findOneAndUpdate(
        { userId: req.user._id },
        {
          $set: {
            stateOrder: Number(state),
          },
        },
        {
          new: true,
        },
        (err) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: "failed updated state order",
            });
          }
          return res.status(200).json({
            success: false,
            message: "🤗 Updated State Order",
          });
        }
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
