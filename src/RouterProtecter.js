import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticate } from "./utils";
import Login from './components/Login'

// eslint-disable-next-line import/no-anonymous-default-export
const RouterProtecter = () => {
  // const {children} = props
   if(!isAuthenticate()){
    return <Navigate to="/login"/>
   }
   return isAuthenticate? <Outlet/> : <Login/>


};
export default RouterProtecter
