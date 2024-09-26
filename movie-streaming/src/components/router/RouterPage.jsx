import { Routes, Route, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

//importing client components
import Header from "../Header";
import Home from "../Home";
import Browse from "../Browse";
import Search from "../Search";
import PageNotFound from "../PageNotFound";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Pricing from "../authentication/Pricing";

//importing admin components
import Sidebar from "../admin/layout/Sidebar";
import AdminHeader from "../admin/layout/Header";
import Main from "../admin/layout/Main";
//admi pages
import Dashboard from "../admin/pages/Dashboard";
import Movies from "../admin/pages/Movies";
import Series from "../admin/pages/Series";
import Users from "../admin/pages/Users";

//context provider
import { MoviesContextProvider } from "../context/MoviesContext";

export default function RouterPage() {
   //use location hook
   const location = useLocation();

   const path = location.pathname.split("/")[1];
   const token = Cookies.get("token");
   const userType = Cookies.get("userType");

   if (
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/pricing"
   ) {
      window.location.href = "/login";
   }

   if (
      token &&
      (location.pathname === "/login" || location.pathname === "/register")
   ) {
      window.location.href = "/";
   }

   if (token && userType !== "admin" && location.pathname === "/admin") {
      window.location.href = "/";
   }

   return (
      <>
         <MoviesContextProvider>
            {path === "admin" ? (
               token &&
               userType === "admin" && (
                  <div className="admin">
                     <Sidebar />
                     <Main>
                        <AdminHeader />
                        <Routes>
                           <Route path="/admin" element={<Dashboard />} />
                           <Route path="/admin/movies" element={<Movies />} />
                           <Route path="/admin/series" element={<Series />} />
                           <Route path="/admin/users" element={<Users />} />
                        </Routes>
                     </Main>
                  </div>
               )
            ) : (
               <>
                  {location.pathname === "/login" ||
                  location.pathname === "/register" ||
                  location.pathname === "/pricing"
                     ? !token && (
                          <>
                             <Routes>
                                <Route
                                   path="/login"
                                   exact
                                   element={<Login />}
                                />
                                <Route
                                   path="/register"
                                   exact
                                   element={<Register />}
                                />
                                <Route
                                   path="/pricing"
                                   exact
                                   element={<Pricing />}
                                />
                             </Routes>
                          </>
                       )
                     : token && (
                          <>
                             <Header />
                             <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                   path="/browse/:showType/:id"
                                   element={<Browse />}
                                />
                                <Route
                                   path="/search/:name"
                                   element={<Search />}
                                />
                                <Route path="/search/" element={<Home />} />
                                <Route path="*" element={<PageNotFound />} />
                             </Routes>
                          </>
                       )}
               </>
            )}
         </MoviesContextProvider>
      </>
   );
}
