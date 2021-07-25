const Cart = require("../models/cartModel");

module.exports = {
  addToCart: async (req, res) => {
    try {
      //check if user have cart
      const { itemId, qty } = req.body;
      const isUser = await Cart.findOne({
        userId: req.user._id,
      });
      if (!isUser) {
        //falsy
        const newCartItems = new Cart({
          userId: req.user._id,
          itemsId: [
            {
              item: itemId,
              qty: qty,
            },
          ],
        });

        await newCartItems.save((err) => {
          if (err) {
            throw new Error(err);
          }
          return res.status(201).json({
            success: false,
            message: "Added  item ♥",
          });
        });
      }

      const alreadyInCart = await Cart.findOne({
        userId: req.user._id,
        "itemsId.item": itemId,
      });

      if (!alreadyInCart) {
        await Cart.updateOne(
          {
            userId: req.user._id,
          },
          {
            $addToSet: {
              itemsId: { item: itemId, qty },
            },
          },
          { new: true },
          async (err) => {
            if (err) {
              throw new Error(err.message);
            }
            return res.status(200).json({
              success: false,
              message: "Add new Item 😊",
            });
          }
        );
      } else {
        return res.status(200).json({
          success: false,
          message: "Already Taken 😊",
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllInCart: async (req, res) => {
    try {
      await Cart.find({ userId: req.user._id })
        .populate("userId")
        .populate("itemsId.item")
        .exec((err, resp) => {
          if (err) {
            throw new Error(error);
          }
          res.status(200).json({
            success: true,
            message: resp,
          });
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOneItemAndUpdate: async (req, res) => {
    const { qty, objId } = req.body;

    await await Cart.findOneAndUpdate(
      {
        userId: req.user._id,
        "itemsId._id": objId,
      },
      {
        $set: {
          "itemsId.$.qty": qty,
        },
      },
      {
        new: true,
      },
      (err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "😺 Updated Successfully",
          });
        }
      }
    );
  },
  getOneItemAndDelete: async (req, res) => {
    try {
      const { id } = req.query;

      await Cart.updateOne(
        { userId: req.user._id },
        {
          $pull: { itemsId: { item: id } },
        },
        null,
        (err) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: err.message,
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Deleted successfully",
            });
          }
        }
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteCart: async (req, res) => {
    try {
      await Cart.findOneAndDelete({ userId: req.user._id }, null, (err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "🤗 Deleted cart",
          });
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
