import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./authContext";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import Home from "./pages/Home/Home.js";
import Account from "./pages/Account/Account.js";
import Profile from "./pages/Account/Profile.js";
import Verification from "./pages/Account/verification.js";
import Men from "./pages/Men-shop/Men-shop.js";
import Women from "./pages/Women-shop/Women-shop.js";
import Children from "./pages/Shops/Kids/Kids.js";
import LXR_G from "./pages/Shops/Lacoste-RG/Lacoste-RG.js";
import Store from "./pages/Store/Store.js";
import History from "./pages/History/History.js";

function App() {
  const [user, setUser] = useState({});

  const User = (value) => {
    setUser(value);
  };
  const cachedUser = localStorage.getItem('user');
  useEffect(() => {
    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      console.log(user.username);
      console.log(user.password);
      setUser(user);
    }
  }, [])
  return (
    <Router>
      <AuthContext.Consumer>
        {(authContext) => (
          <>
            <Header isLoggedIn={authContext.isLoggedIn} User={user} />
            <ToastContainer />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/account" element={<Account sendValue={User} />} />
              <Route path="/profile" element={<Profile User={user} />} />
              <Route path="/men" element={<Men User={user} />} />
              <Route path="/women" element={<Women User={user} />} />
              <Route path="/children" element={<Children User={user} />} />
              <Route path="/LXR_G" element={<LXR_G User={user} />} />
              <Route path="/store" element={<Store User={user} />} />
              <Route path="/history" element={<History />} />
              <Route path="/verification" element={<Verification />} />
            </Routes>
          </>
        )}
      </AuthContext.Consumer>
    </Router>
  );
}

export default App;
