import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Brands from "../pages/Brands";
import Videos from "../pages/Videos";
import ViewingRoom from "../pages/viewing-room";
import { LoginContext } from "../store/auth";
import { ProductContext } from "../store/Product";
import Projects from "../pages/Projects";

const AppRouter: React.FC = () => {
  const { getMetaConfig,getProductConfig } = useContext(ProductContext);
  const { checkForLoginAndUpdate } = useContext(LoginContext);

  useEffect(() => {
    checkForLoginAndUpdate();
    getProductConfig();
    getMetaConfig();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/viewing_room" element={<ViewingRoom />} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
