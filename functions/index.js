const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

require("dotenv").config({ path: ".env" });
const stripe = require("stripe")(process.env.STRIPE_KEY);

//initialise app
const app = express();

//middleware
app.use(cors({ origin: true }));
app.use(express.json());

//api requests
app.get("/", (req, res) => {
  res.status(200).send("hello amazon clone");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total; //remember the query param "?total"

  console.log("hey we made the REQ!!! for amount>>>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listen
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-app-cf24b/us-central1/api
