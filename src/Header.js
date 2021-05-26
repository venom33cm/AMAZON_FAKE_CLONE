import { React, useEffect } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { GetContext } from "./StateProvider";
import { auth } from "./firebase.js";
const Header = () => {
  const [{ basket, user }, dispatch] = GetContext();
  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header_search">
        <input type="text" className="header_input" />
        <SearchIcon className="searchicon" />
      </div>

      <div className="header_sidenav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuth} className="header_sidecomponent">
            <span className="header__lineOne">
              {user ? `Hello ${user.email}` : "Hello Guest"}
            </span>
            <span className="header__lineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/order">
          <div className="header_sidecomponent">
            <span className="header__lineOne">Returns</span>
            <span className="header__lineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header_sidecomponent">
          <span className="header__lineOne">Your</span>
          <span className="header__lineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="sidebasket">
            <ShoppingBasketIcon className="basket_icon" />
            <span className="header__lineTwo countcomponent">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
