import { Navigate, Outlet } from "react-router-dom";
import Login from "./components/Login";
import { isAuthenticate } from "./utils/utils";

// eslint-disable-next-line import/no-anonymous-default-export
const RouterProtecter = () => {
  // const {children} = props
   // if(!isAuthenticate()){
   //  return <Navigate to="/Login"/>
   // }
   return isAuthenticate() ? <Outlet/> : <Login/>


};
export default RouterProtecter
