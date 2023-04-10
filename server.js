const express = require("express");
const app = express();
const PORT = 3000;
const stripe = require('stripe')('sk_test_51MvFCBDKavkXh9PEcAhDi6ugf0u2JIGOHUiPBUpLy38JvS4Nohu8olHaSbSmBN7AR1NFdMOcUiHm1y1MNm8CYmUe00yYSwlKS9');

const YOUR_DOMAIN = "http://localhost:3000";


app.use(express.static("public"));

app.post("/create-checkout-session", async(req, res) => {
  try {
    const prices = await stripe.prices.list();
    // console.log(prices);
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.redirect(303, session.url);
  } catch(err) {

  }
});

app.listen(PORT, console.log("サーバーが起動しました"));
