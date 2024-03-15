import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orders: [
    {
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
            required: true,
          },
          _id: {
            type: String,
            required: true,
          },
        },
      ],
      amount: {
        type: Number,
        required: true,
      },
      orderId: {
        type: String,
        required: true,
      },
    },
  ],
});
const Order = mongoose.model("Order", orderSchema);
export default Order;
