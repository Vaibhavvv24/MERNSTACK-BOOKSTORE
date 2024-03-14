import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }); //getting cart by id of user
    res.status(200).json({ userId: req.params.id, cart: cart });
  } catch (err) {
    res.status(404).json({ message: err.message, success: false });
  }
};
export const addToCart = async (req, res) => {
  const cart = new Cart({
    userId: req.body.userId,
    products: req.body.products,
    amount: req.body.amount,
  });
  await cart.save();
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
    const cart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
