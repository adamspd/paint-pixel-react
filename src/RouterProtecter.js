import { Outlet } from "react-router-dom";
import Login from "./components/Login";
import { isAuthenticate } from "./utils/utils";

// eslint-disable-next-line import/no-anonymous-default-export
const RouterProtecter = () => {
   return isAuthenticate() ? <Outlet/> : <Login/>


};
export default RouterProtecter
