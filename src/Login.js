import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase.js";
import "./login.css";
// import { GetContext } from "./StateProvider";
function Login() {
  // const [{}, dispatch] = GetContext();
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const loginAuth = (e) => {
    e.preventDefault();
    // login with firebase things happen here
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  const registerAuth = (e) => {
    e.preventDefault();
    // registering with firebase happens here dope
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(auth);
        // if (auth) {
        //   dispatch({
        //     type: "AUTH_USER",
        //     user: null,
        //   });
        if (auth) {
          history.push("/");
        }
      })
      .catch((er) => alert(er.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login-container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <h5>password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button type="submit" onClick={loginAuth}>
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to AMAZON CLONE'S Conditions of Use & Sale,
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-based Ads Notice
        </p>
        <button onClick={registerAuth}>Create your Amazon Account</button>
      </div>
    </div>
  );
}

export default Login;
