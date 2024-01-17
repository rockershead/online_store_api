const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const Product = {
  name: "Product",
  define: {
    _id: { type: String, require: true, default: uuid },
    description: {
      type: String,
      required: true,
    },

    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
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

const schema = mongoose.Schema(Product.define, Product.options);

// this function helps to ignore deleted documents
//setPreIgnoreDeletedDocuments(schema);

module.exports = mongoose.model(Product.name, schema);
