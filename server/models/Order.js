const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

/*const User = new mongoose.Schema({
  //userId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
});*/

const Item = new mongoose.Schema({
  productId: { type: String, require: true },
  quantity: { type: Number, require: true },
});

const Order = {
  name: "Order",
  define: {
    _id: { type: String, require: true, default: uuid },
    email: { type: String, required: true },
    items: {
      type: [Item],
      required: true,
    },
    totalPaid: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
    },

    deletedAt: { type: Date, select: false },
  },
  options: {
    autoCreate: false,
    timestamps: true,
  },
};

const schema = mongoose.Schema(Order.define, Order.options);

// this function helps to ignore deleted documents
//setPreIgnoreDeletedDocuments(schema);

module.exports = mongoose.model(Order.name, schema);
