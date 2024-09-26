import React from "react";
import { GrFormClose } from "react-icons/gr";
import MoviesContext from "../context/MoviesContext";
import { useContext, useEffect, useState } from "react";

function Video({ showType }) {
  const { movieVideo, tvVideo } = useContext(MoviesContext);

  const closeEmbed = () => {
    document.querySelector(".embed").classList.add("hide-embed");
    setTimeout(() => {
      document.querySelector(".embed").classList.add("embed-none");
    }, 1000)();

    document.querySelector("iframe").click();
  };

  const [trailer, setTrailer] = useState();

  useEffect(() => {
    if (showType == "movie" && movieVideo) {
      const video = movieVideo.results;
      if (video && video.length != 0) {
        setTrailer(
          video.filter((element) => {
            if (element.type === "Trailer") return element;
          })[0].key
        );
      }
    }
    if (showType == "tv" && tvVideo) {
      const video = tvVideo.results;
      if (video) {
        setTrailer(
          video.filter((element) => {
            if (element.type === "Trailer") return element;
          })[0].key
        );
      }
    }
  }, [movieVideo, tvVideo]);

  return (
    <div className="embed hide-embed embed-none">
      <GrFormClose className="btn-cross" onClick={closeEmbed} />
      <iframe
        width="100%"
        height="600"
        src={`https://www.youtube.com/embed/${trailer}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Video;
