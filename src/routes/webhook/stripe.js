import express from "express";
import config from "../../config/index.js";
import { stripe } from "../../lib/stripe.js";

const { stripe: stripeConfig } = config;

const router = express.Router();

router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
	const sig = req.headers["stripe-signature"];
	const endpointSecret = stripeConfig.webhookSecret;

	let event;

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
	} catch (err) {
		console.error(`Error verifying webhook signature: ${err.message}`);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	const session = event.data.object;
	// Handle the event
	switch (event.type) {
		case "checkout.session.async_payment_succeeded":
		case "payment_intent.succeeded":
		case "invoice.paid": {
			console.log("PaymentIntent was successful!");
			console.log(session);
			console.log("Session ID: ", session.id);
			console.log("Customer ID: ", session.customer);
			console.log("Payment Intent ID: ", session.payment_intent);
			console.log("Subscription ID: ", session.subscription);
			console.log("Status: ", session.status);
			break;
		}
		case "checkout.session.async_payment_failed": {
			console.log("PaymentIntent was not successful!");
			break;
		}
		// console.log("PaymentIntent was successful!");
		// break;
		// case "payment_method.attached":
		// console.log("PaymentMethod was attached to a Customer!");
		// break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	res.status(200).json({ received: true });
});

export default router;
