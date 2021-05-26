import { React, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { auth } from "./firebase.js";
import { GetContext } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Order from "./Orders";

const promise = loadStripe(
  "pk_test_51ItsVNSJnizSRYwbY8RZubTTRT63QZ2QSSop3VtXohyyKDaubNPOBIY1Qehp9ZFHBnxdBWDxg6aMoivBmXVDItXQ00LWhymdN1"
);

const App = () => {
  const [{}, dispatch] = GetContext();
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      console.log("the user is>>>", authuser);
      if (authuser) {
        dispatch({
          type: "AUTH_USER",
          user: authuser,
        });
      } else {
        dispatch({
          type: "AUTH_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Order">
            <Header />
            <Order />
          </Route>

          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
