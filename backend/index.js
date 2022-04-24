const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
const bodyParser = require("body-parser");

const stripe = require("stripe")(process.env.SECRET_KEY);
const admin = require("firebase-admin");
const { buffer, text, json } = require("micro");
const serviceAccount = require("./permissions.json");
const firebaseApp = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();
const endpointsecret = process.env.WEBHOOK_SIGNIN;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/payment", async (req, res) => {
  const { items, email, total } = req.body;
  // console.log(items);
  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1KrWaHBaiWCYGEGW4hGl0khT"],

    shipping_address_collection: {
      allowed_countries: [
        "US",
        "CA",
        "GB",
        "AU",
        "IE",
        "NZ",
        "FR",
        "DE",
        "IT",
        "ES",
        "NL",
        "BE",
        "DK",
        "NO",
        "SE",
        "FI",
        "EE",
        "LV",
        "LT",
        "PL",
        "CZ",
        "AT",
        "CH",
        "PT",
        "HU",
        "HR",
        "RO",
        "SK",
        "SI",
        "BG",
        "BA",
        "RS",
        "ME",
        "AL",
        "MK",
        "TR",
        "GR",
        "IS",
        "LI",
        "MT",
        "SI",
        "BA",
        "HR",
        "RS",
        "ME",
        "AL",
        "EG",
        "SA",
        "AE",
        "KW",
        "BH",
        "DZ",
        "KM",
        "DJ",
      ],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({
    url: session.url,
  });
});
const fulfilOrder = async (session) => {
  return firebaseApp
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Order Placed ${session.id} in the db`);
    })
    .catch((err) => {
      console.log("failed to place order", err);
    });
};
app.post(
  "/webhook",
  bodyparser.raw({
    type: "application/json",
  }),
  async (req, res) => {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    console.log(sig);
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointsecret);
    } catch (err) {
      console.log("err");
      return res.sendStatus(400).send(err.message);
    }
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        fulfilOrder(paymentIntent);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // if (event.type === "payment_intent.succeeded") {
    //   const session = event.data.object;
    //   return fulfilOrder(session)
    //     .then(() => {
    //       res.sendStatus(200);
    //     })
    //     .then(() => {})
    //     .catch((err) => {
    //       res.sendStatus(400).send(`Error in fulfilling order ${err.message}`);
    //     });
    // }
    res.sendStatus(200);
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port 8282");
});
