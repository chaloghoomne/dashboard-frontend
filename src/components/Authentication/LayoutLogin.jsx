import LoginBackground from "../../assets/background.jpg";
import { Outlet } from "react-router-dom";


const LoginLayout = () => {
  return (
    <div
      className="w-screen h-screen bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
