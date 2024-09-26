import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/netflix.png";

import { useLocation } from "react-router-dom";

import "../../../assets/styles/admin/Sidebar.scss";

console.log(window.location.pathname);
const sidebarItem = [
   {
      name: "Dashboard",
      path: "/admin/",
   },
   {
      name: "Movies",
      path: "/admin/movies",
   },
   {
      name: "Series",
      path: "/admin/series",
   },
   {
      name: "Users",
      path: "/admin/users",
   },
];

export default function Sidebar() {
   const location = useLocation();
   return (
      <div className="sidebar">
         <div>
            <img src={logo} alt="" style={{ width: "30%" }} />
         </div>

         <ul>
            {sidebarItem.map((item, index) => (
               <li key={index}>
                  <Link
                     to={item.path}
                     className={`${
                        location.pathname === item.path && "bg-gray-600"
                     }`}
                  >
                     {item.name}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
}
