import "./assets/styles/App.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

import RouterPage from "./components/router/RouterPage";

function App() {
   return (
      <div className="App">
         <Router>
            <RouterPage />
         </Router>
      </div>
   );
}

export default App;
