import React from "react";
import banner from "../../assets/img/mvoie.jpg";

interface PropsCard {
  items: { url: string; title: string; year: string }[];
}

function Carousel({ items }: PropsCard): JSX.Element {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-ride="carousel"
      style={{
        maxWidth: "100%",
        maxHeight: "305px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img className="d-block w-100" src={banner} style={{}} />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
