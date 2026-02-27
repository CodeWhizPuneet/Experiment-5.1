const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name cannot exceed 80 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Electronics", "Accessories", "Home", "Office", "Other"],
        message: "Category must be one of: Electronics, Accessories, Home, Office, Other",
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Custom instance method: apply a percentage discount to price
productSchema.methods.applyDiscount = function (percent) {
  if (percent < 0 || percent > 100) throw new Error("Discount must be between 0 and 100");
  this.price = parseFloat((this.price * (1 - percent / 100)).toFixed(2));
};

module.exports = mongoose.model("Product", productSchema);