const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const User = {
  name: "User",
  define: {
    _id: { type: String, require: true, default: uuid },
    email: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    storeIds: {
      type: Array,
      required: false,
    },
    confirmationStatus: {
      type: Boolean,
      required: false,
    },
    passwordUpdatedAt: { type: Date, select: false },
    deletedAt: { type: Date, select: false },
  },
  options: {
    autoCreate: false,
    timestamps: true,
  },
};

const schema = mongoose.Schema(User.define, User.options);

// this function helps to ignore deleted documents
//setPreIgnoreDeletedDocuments(schema);

module.exports = mongoose.model(User.name, schema);
