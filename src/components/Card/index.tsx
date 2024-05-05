import React from "react";

interface PropsCard {
  url: string;
  title: string;
  year: string;
}

function Card({ url, title, year }: PropsCard): JSX.Element {
  if (!url || !title || !year) {
    return <div>No Data</div>;
  }

  return (
    <div
      className="card-container mt-4"
      style={{
        width: "400px",
        height: "800px",
        margin: "5px",
        overflow: "hidden",
      }}
    >
      <div
        className="card "
        style={{ width: "100%", height: "80%", backgroundColor: "gray" }}
      >
        <img
          className="card-img-top"
          src={url}
          alt={`Poster for ${title}`}
          style={{ width: "100%", height: "80%", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{year}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
