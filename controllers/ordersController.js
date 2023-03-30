import OrderCollection from "../models/orderSchema.js";
import ProductCollection from "../models/productSchema.js";
import { stripe } from "../server.js";

export const getAllOrders = async (req, res) => {
  //request handle // controller
  try {
    //populate select or deselect (use - sign) properties by passing second argument in the populate method.
    //Projection cannot have a mix of inclusion and exclusion .populate("userId","lastName email -password -firstName")
    const orders = await OrderCollection.find()
      .populate("userId", "lastName email")
      .populate("products", "title price");
    res.json({ success: true, data: orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const openStripeChekoutPage = async (req, res) => {
  try {
    const data = [];
    for (const id of req.body.products) {
      data.push(await ProductCollection.findById(id));
    }

    const line_items = data.map((product) => {
      return {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            images: [product.thumbnail],
            description: product.description,
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      };
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `https://e-store-fullstack-app-y3j0.onrender.com/#/cart?success=true`,
      cancel_url: `https://e-store-fullstack-app-y3j0.onrender.com/#/cart?success=false`,
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const addNewOrder = async (req, res, next) => {
  try {
    const order = new OrderCollection(req.body);
    await order.save();
    res.json({ success: true, data: order });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    /*  const order = await OrderCollection.findOne({_id:id}) */

    const order = await OrderCollection.findById(id);
    if (order) {
      res.json({ success: true, data: order });
    } else {
      res.json({ success: false, message: "please provide valid id" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedorder = await OrderCollection.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, data: updatedorder });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedorder = await OrderCollection.findByIdAndDelete(id);

    res.json({ success: true, data: deletedorder });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const getAllUserOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    //get all orders belonging to that specific user
    const userOrders = await OrderCollection.find({ userId: id }).populate(
      "products"
    );
    /* [ {
        userId:"sfajfjakj45w5kjwh4j636",
        products: [{title:"", price:""} "!§12,4bj1j24gh142h1g4"],
        total: 3400
    } ]*/
    res.json({ success: true, data: userOrders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
