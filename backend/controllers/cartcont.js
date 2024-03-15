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
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.params.id });
    res.status(200).json({ message: "Cart has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateCart = async (req, res) => {
  let cart = await Cart.findOne({ userId: req.params.id });
  const newProducts = cart.products.filter((product) => {
    console.log(product);
    console.log(req.body);
    console.log(product.productId);
    console.log(product.productId !== req.body.productId);
    return product.productId !== req.body.productId;
  });

  const newAmount = newProducts.reduce((acc, curr) => {
    return acc + curr.salePrice;
  }, 0);
  // console.log(newAmount);
  try {
    cart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: {
          userId: req.body.userId,
          products: newProducts,
          amount: newAmount,
        },
      },
      { new: true }
    );
    await cart.save();
    res.status(200).json({ message: "Cart has been updated", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
