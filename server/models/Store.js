const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const Store = {
  name: "Store",
  define: {
    _id: { type: String, require: true, default: uuid },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
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

const schema = mongoose.Schema(Store.define, Store.options);

// this function helps to ignore deleted documents
//setPreIgnoreDeletedDocuments(schema);

module.exports = mongoose.model(Store.name, schema);
