import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginRoutes } from "./components/pages/routes/LoginRoutes";
import PrivateRoutes from "./components/Authentication/ProtectedRoute";
import LoginLayout from "./components/Authentication/LayoutLogin";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import AcceptedUser from "./components/pages/user/AcceptedUser";
import RejectedUser from "./components/pages/user/RejectedUser";
import PendingUser from "./components/pages/user/PendingUser";
import BlockedUser from "./components/pages/user/BlockedUser";
import User from "./components/pages/user/user";
import HomeLayoutGhoomne from "./components/pages/HomeLayoutGhoomne";
import Country from "./components/pages/Packages/Country";
import Plans from "./components/pages/Packages/Plans/Plans";



const MainlayoutGhoomne = () => {
  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {LoginRoutes?.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Route>
      <Route
        path="/home"
        element={
          <PrivateRoutes>
            <HomeLayoutGhoomne />
          </PrivateRoutes>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/home/requests/:id" element={<User />} />
        <Route path="/home/requests/accepted" element={<AcceptedUser />} />
        <Route path="/home/requests/rejected" element={<RejectedUser />} />
        <Route path="/home/requests/pending" element={<PendingUser />} />
        <Route path="/home/requests/blocked" element={<BlockedUser />} />
        <Route path="/home/packages/country" element={<Country />} />
         <Route path="/home/packages/plans" element={<Plans />} />
      </Route>
    </Routes>
  );
};

export default MainlayoutGhoomne;
