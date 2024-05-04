import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchMoviesBySearchTerm } from "../../services/master.services";

interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export default function HomePage() {
  const [keyword, setKeyword] = useState<string>("Indonesia");
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMoviesBySearchTerm(keyword, 1)
      .then((response) => {
        const responseData: any = response.data;
        setResults(responseData.Search);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword]);

  console.log(results, "res");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <p>A</p>
    </div>
  );
}
