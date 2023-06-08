import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import Header from "./pages/Header/Header"
import Footer from "./pages/Footer/Footer"
import Home from "./pages/Home/Home.js";
import Account from "./pages/Account/Account.js";
import Verification from "./pages/Account/verification.js";
import Men from "./pages/Men-shop/Men-shop.js";
import Women from "./pages/Women-shop/Women-shop.js";
import Children from "./pages/Shops/Kids/Kids.js";
import LXR_G from "./pages/Shops/Lacoste-RG/Lacoste-RG.js";
import Store from "./pages/Store/Store.js";
import History from "./pages/History/History.js"
function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/children" element={<Children />} />
        <Route path="/LXR_G" element={<LXR_G />} />
        <Route path="/store" element={<Store />} />
        <Route path="/history" element={<History />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;