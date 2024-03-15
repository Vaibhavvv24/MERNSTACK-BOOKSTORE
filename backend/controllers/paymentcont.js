import { instance } from "../Server.js";

import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
export const Checkout = async (req, res) => {
  try {
    const products = req.body.products;

    let item = {
      title: "",
      salePrice: 0,
    };
    const noTes = {};

    for (let i = 0; i < products.length; i++) {
      item.title = products[i].title;
      item.salePrice = products[i].salePrice;
      noTes[item.title] = item.salePrice;
    }
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      notes: noTes,
    };
    const order = await instance.orders.create(options);
    //console.log(order);
    const newOrders = await Order.findOne({ userId: req.body.userId });
    console.log(newOrders);
    if (newOrders) {
      const order1 = {
        products: req.body.products,
        amount: req.body.amount,
        orderId: order.id,
        createdAt: order.created_at,
      };
      newOrders.orders.push(order1);
      await newOrders.save();
    } else {
      const order1 = {
        products: req.body.products,
        amount: req.body.amount,
        orderId: order.id,
        createdAt: order.created_at,
      };
      const orderstemp = [];
      orderstemp.push(order1);
      const orders = await Order.create({
        userId: req.body.userId,
        orders: orderstemp,
      });
      console.log(orders);
      await orders.save();
    }

    res.send(order);
  } catch (err) {
    console.log(err);
  }
};

export const Payverify = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const isVerified = await validatePaymentVerification(
    { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
    razorpay_signature,
    process.env.SECRET_RAZOR
  );
  //console.log(isVerified);
  //console.log(req.body);
  if (isVerified) {
    const payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    await payment.save();

    res.redirect(
      `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
