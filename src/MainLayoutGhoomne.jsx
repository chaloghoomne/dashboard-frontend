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
import HeadingsAdd from "./components/pages/Headings/HeadingsAdd";
import ImportantPoints from "./components/pages/important-points/ImportantPoints";
import Partners from "./components/pages/Partners/Partners";
import EditPartner from "./components/pages/Partners/components/PartnerEdit";
import EditImportantPoints from "./components/pages/important-points/components/ImportantPointsEdit";
import CountryEdit from "./components/pages/Packages/components/CountryEdit";
import PlanEdit from "./components/pages/Packages/Plans/components.jsx/PlanEdit";
import Users from "./components/pages/users/users";
import RejectedRequests from "./components/pages/visa-requests/RejectedRequests";
import PendingRequests from "./components/pages/visa-requests/PendingRequest";
import AcceptedRequests from "./components/pages/visa-requests/AcceptedRequests";
import BlackListRequest from "./components/pages/visa-requests/BlackListRequest";
import ProfileEdit from "./components/pages/EditProfile/ProfileEdit";
import Docs from "./components/pages/Packages/documents/Docs";
import Subscribers from "./components/pages/subscribers/Subscribers";
import Notifications from "./components/pages/notifications/Notifications";
import GetNotifications from "./components/pages/notifications/GetNotifications";
import NotificationSend from "./components/pages/notifications/SendNotificationsUsers";
import ShowFull from "./components/pages/Packages/components/ShowFull";
import DraftRequests from "./components/draft-visa-request/DraftRequest";

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
        <Route path="/home/users" element={<Users />} />
        <Route path="/home/request" element={<AcceptedRequests />} />
        <Route
          path="/home/request/senttoimmigration"
          element={<AcceptedRequests />}
        />
        <Route path="/home/request/pending" element={<PendingRequests />} />
        <Route path="/home/request/blacklist" element={<BlackListRequest />} />
        <Route path="/home/request/rejected" element={<RejectedRequests />} />
        <Route path="/home/requests/:id" element={<User />} />
        <Route path="/home/editprofile" element={<ProfileEdit />} />
        <Route path="/home/requests/accepted" element={<AcceptedUser />} />
        <Route path="/home/requests/rejected" element={<RejectedUser />} />
        <Route path="/home/requests/pending" element={<PendingUser />} />
        <Route path="/home/requests/blocked" element={<BlockedUser />} />
        <Route path="/home/visa/country" element={<Country />} />
        <Route path="/home/visa/showfull/:id" element={<ShowFull />} />
        <Route path="/home/visa/country/:id" element={<CountryEdit />} />
        <Route path="/home/visa/plans" element={<Plans />} />
        <Route path="/home/visa/documents" element={<Docs />} />
        <Route path="/home/visa/plans/:id" element={<PlanEdit />} />
        <Route path="/home/headings" element={<HeadingsAdd />} />
        <Route path="/home/subscriber" element={<Subscribers />} />
        <Route path="/home/important" element={<ImportantPoints />} />
        <Route
          path="/home/important-point/:id"
          element={<EditImportantPoints />}
        />
        <Route path="/home/partners" element={<Partners />} />
        <Route path="/home/pending" element={<DraftRequests />} />
        <Route path="/home/notification" element={<Notifications />} />
        <Route path="/home/getnotification" element={<GetNotifications />} />
        <Route path="/home/notification/add" element={<NotificationSend />} />
        <Route path="/home/partner/:id" element={<EditPartner />} />
      </Route>
    </Routes>
  );
};

export default MainlayoutGhoomne;
