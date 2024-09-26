import { useEffect, useState, useContext } from "react";
import MoviesContext from "../../context/MoviesContext";

import binarySearch from "../algorithms/binarySearch";
import Search from "../shared/Search";

export default function Users() {
   const { users: rawUsers } = useContext(MoviesContext);

   const [search, setSearch] = useState("");
   const [users, setUsers] = useState(rawUsers);

   useEffect(() => {
      const targetEmail = search;
      if (targetEmail.length === 0) return setUsers(rawUsers);
      const targetUser = binarySearch(rawUsers, targetEmail);
      if (targetUser.length > 0) {
         setUsers(targetUser);
      } else {
         alert("user not found");
         setUsers([]);
      }
   }, [search]);

   useEffect(() => {
      setUsers(rawUsers);
   }, [rawUsers]);

   return (
      <>
         <div className="w-fit mx-auto">
            <Search setSearch={setSearch} />
         </div>
         <table>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Payment</th>
               </tr>
            </thead>
            <tbody>
               {users.map((user) => (
                  <tr key={user._id}>
                     <td>{user._id}</td>
                     <td>{user.email}</td>
                     <td>{user.paid}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
}
