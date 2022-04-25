const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
const bodyParser = require("body-parser");
const moment = require("moment");
const stripe = require("stripe")(process.env.SECRET_KEY);
const admin = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const serviceAccount = require("./permissions.json");

const firebaseApp = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();
const db = getFirestore();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});
const endpointsecret = `whsec_2eaaa9ee72833c820fa3bd19a3f9a30f432d6d1b059e03a3fd5e64a72ec63549`;

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
    const payload = req.body;

    const sig = req.headers["stripe-signature"];
    console.log("sig:", sig);
    let event;

    try {
      event = await stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointsecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      fulfilOrder(session);
    }

    res.sendStatus(200);
  }
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/orders", async (req, res) => {
  const StripeOrders = await db
    .collection("users")
    .doc(req?.body?.email)
    .collection("orders")
    .get();

  const orders = await Promise.all(
    StripeOrders.docs.map(async (doc) => ({
      id: doc.id,
      amount: doc.data().amount,
      amount_shipping: doc.data().amount_shipping,
      images: doc.data().images,
      timestamp: moment(doc.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(doc.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return res.status(200).json(orders);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port 8282");
});
