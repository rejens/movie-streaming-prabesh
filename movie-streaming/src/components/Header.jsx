import Logo from "../assets/img/netflix.png";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import MoviesContext from "./context/MoviesContext";
import Cookies from "js-cookie";

function Header() {
   var lastScrollTop = 0;

   const { search, setSearch } = useContext(MoviesContext);

   const navigate = useNavigate();
   // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
   document.addEventListener(
      "scroll",
      function () {
         // or window.addEventListener("scroll"....
         var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
         if (st > lastScrollTop) {
            // alert("down scroll");
            document.querySelector("header").classList.add("hide-navbar");
         } else if (st < lastScrollTop) {
            document.querySelector("header").classList.remove("hide-navbar");
         } // else was horizontal scroll
         lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      },
      false
   );

   //handle logout
   const logout = () => {
      Cookies.set("token", "");
      Cookies.set("userType", "");
      window.location.href = "/";
   };

   const searchText = (e) => {
      setSearch(e.target.value);
      navigate(`/search/${e.target.value}`);
   };

   return (
      <header className="">
         <nav>
            <div className="container d-flex gap-5">
               <Link to="/">
                  {" "}
                  <img src={Logo} alt="logo" className="logo " />
               </Link>
               <InputGroup className="mb-3 w-50">
                  <InputGroup.Text
                     id="inputGroup-sizing-small"
                     className="search-icon-background "
                  >
                     <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                     onChange={searchText}
                     className="search-bar"
                     aria-label="small"
                     aria-describedby="inputGroup-sizing-small"
                  />
               </InputGroup>{" "}
            </div>
            <button
               className="bg-red-500 px-3 py-2 rounded-md absolute right-5 top-0"
               onClick={logout}
            >
               logout
            </button>
         </nav>
      </header>
   );
}

export default Header;
