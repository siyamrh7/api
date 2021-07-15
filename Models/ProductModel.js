const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      required: true,
    },
    detail1name: {
      type: String,
    },
    detail1value: {
      type: String,
    },
    detail2name: {
      type: String,
    },
    detail2value: {
      type: String,
    },
    detail3name: {
      type: String,
    },
    detail3value: {
      type: String,
    },
    detail4name: {
      type: String,
    },
    detail4value: {
      type: String,
    },
    detail5name: {
      type: String,
    },
    detail5value: {
      type: String,
    },
    detail6name: {
      type: String,
    },
    detail6value: {
      type: String,
    },
    detail7name: {
      type: String,
    },
    detail7value: {
      type: String,
    },
    detail8name: {
      type: String,
    },
    detail8value: {
      type: String,
    },
    detail9name: {
      type: String,
    },
    detail9value: {
      type: String,
    },
    detail10name: {
      type: String,
    },
    detail10value: {
      type: String,
    },
    event: {
      type: String,
    },
    images: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      requred: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
