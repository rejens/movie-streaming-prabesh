import { React, useContext } from "react";
import Pamphlet from "./Pamphlet";
import Header from "../Header";

function PamphletList({ title, shows, type }) {
  return (
    <div className="container movie-section">
      <div className="title">{title}</div>
      <div className="row justify-content-xs-center">
        {shows.map((element) => (
          <div
            key={element.id}
            className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-auto"
          >
              <Pamphlet info={element} type={type} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PamphletList;
