import Stripe from "stripe";
import express from "express";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

router.post("/", express.raw({type: "application/json"}), async (req, res) =>{
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`Error verifying webhook signature: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        // case "payment_intent.succeeded":
        // console.log("PaymentIntent was successful!");
        // break;
        // case "payment_method.attached":
        // console.log("PaymentMethod was attached to a Customer!");
        // break;
        default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
})

export default router;
