import Stripe from "stripe";
import config from "../config/index"

const { stripe: stripeConfig } = config;

// if (!stripeConfig.secretKey) throw new Error("Stripe API Key not provided as environment variable. See '.env.example'");

export const stripe = new Stripe(stripeConfig.secretKey, {
	apiVersion: "2025-04-30.basil",
});
