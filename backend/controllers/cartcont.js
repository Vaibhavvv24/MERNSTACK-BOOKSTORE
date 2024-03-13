import Cart from "../models/Cart.js";


export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(404).json({ message: err.message }); 
    }
}
export const a
