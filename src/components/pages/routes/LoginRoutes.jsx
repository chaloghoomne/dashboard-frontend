import ChangePassword from "../../Authentication/ChangePassword";
import LoginPage from "../../Authentication/Login";
import OTPForPasswordChange from "../../Authentication/OTPForPasswordChange";
import SetPasswordPage from "../../Authentication/SetPasswordPage";


export const LoginRoutes = [
  { path: "/login", component: <LoginPage /> },
  { path: "/changePassword", component: <ChangePassword /> },
  { path: "/changePasswordOTP/:email", component: <OTPForPasswordChange /> },
  { path: "/setPassword/:email", component: <SetPasswordPage /> },
];
