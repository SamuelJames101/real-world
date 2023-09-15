require('dotenv').config();
const stripeClient = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.handler = async (event) => {
    try {
        //Money comes as pence. i.e 900p instead of £09.00
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripeClient.paymentIntents.create({
            amount,
            currency: "gbp",
            payment_method_types: ["card"]
        });    
        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }),
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error }),
        }
    }
}