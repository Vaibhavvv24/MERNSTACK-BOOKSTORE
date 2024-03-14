import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        salePrice: {
          type: Number,
          required: true,
        },
        regularPrice: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        productId: {
          type: String,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
