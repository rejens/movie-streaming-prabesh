import React from "react";
import "../../../assets/styles/admin/Header.scss";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header() {
   const location = useLocation();
   const path = location.pathname.split("/")[2];

   //logout handler
   const logout = () => {
      Cookies.set("token", "");
      Cookies.set("userType", "");
      window.location.href = "/";
   };

   return (
      <div className="header">
         <h1 className="header__title">{path || "Dashboard"}</h1>
         <button className="button" onClick={logout}>
            logout
         </button>
      </div>
   );
}
