const Cart = require('../models/Cart');

exports.addItemToCart = async (req, res, next) => {
    try {
        const carts = await Cart.findOne({ user: req.user._id });

        if (carts) {
            // if cart already exists then update cart;
            const product = req.body.cartItems.product;

            let isProductAlreadyExits = carts.cartItems.find(
                (item) => item.product == product
            );

            if (isProductAlreadyExits) {
                const data = await Cart.findOneAndUpdate(
                    {
                        user: req.user._id,
                        'cartItems.product': product,
                    },
                    {
                        $set: {
                            'cartItems.$': {
                                ...req.body.cartItems,
                                quantity:
                                    req.body.cartItems.quantity +
                                    isProductAlreadyExits.quantity,
                            },
                        },
                    },
                    { new: true }
                );
                return res.send({ cart: data });
            } else {
                const data = await Cart.findOneAndUpdate(
                    {
                        user: req.user._id,
                    },
                    {
                        $push: {
                            cartItems: req.body.cartItems,
                        },
                    },
                    { new: true }
                );
                return res.send({ cart: data });
            }
        } else {
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems],
            });
            const data = await cart.save();

            return res.status(200).send({ cart: data });
        }
    } catch (err) {
        next(err);
    }
};
