import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./pages/Header/Header"
import Home from "./pages/Home/Home.js";
import Mail from "./pages/Mail/Mail.js";
import Apps from "./pages/Apps/Apps.js";
import Store from "./pages/Store/Store.js";
function App() {
  return (
      <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mail" element={<Mail />} />
            <Route path="/app" element={<Apps />} />
            <Route path="/store" element={<Store />} />
        </Routes>
      </Router>
  );
}
  
export default App;