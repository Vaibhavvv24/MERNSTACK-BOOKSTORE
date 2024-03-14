import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }); //getting cart by id of user
    res.status(200).json({ cart });
  } catch (err) {
    res.status(404).json({ message: err.message, success: false });
  }
};
export const addToCart = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json("You can add only your cart");
  }
  const cart = await Cart.findOne({ userId: req.body.userId });
  if (cart) {
    cart.products.push(req.body.products[0]);
    cart.amount = cart.amount + req.body.amount;
    await cart.save();
  } else {
    const cart1 = new Cart({
      userId: req.body.userId,
      products: req.body.products,
      amount: req.body.amount,
    });
    await cart1.save();
    return res.status(200).json({
      message: `Added to cart for ${req.body.userId}`,
      success: true,
      cart: cart1,
    });
  }

  res.status(200).json({
    message: `Added to cart for ${req.body.userId}`,
    success: true,
    cart,
  });
};

export const deleteCart = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json("You can delete only your cart");
  }
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.params.id });
    res.status(200).json({ message: "Cart has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
