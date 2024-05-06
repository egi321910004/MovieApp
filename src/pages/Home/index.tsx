import React, { useEffect, useState } from "react";
import { fetchMoviesBySearchTerm } from "../../services/master.services";
import Card from "../../components/Card";
import Carousel from "../../components/Carousel";
import { Form } from "react-bootstrap";

interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export default function HomePage() {
  const [keyword, setKeyword] = useState<string>("Netflix");
  const [results, setResults] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const itemsPerPage = 5;
  const maxPaginationButtons = 5;

  useEffect(() => {
    fetchMoviesBySearchTerm(keyword, currentPage)
      .then((response) => {
        const responseData: any = response.data;
        setResults(responseData.Search);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword, searchTerm]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPaginationButtons / 2)
  );
  let endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1);
  if (endPage - startPage + 1 < maxPaginationButtons) {
    startPage = Math.max(1, endPage - maxPaginationButtons + 1);
  }

  const moviesForCarousel = results
    .slice(startIndex, endIndex)
    .map((movie) => ({
      url: movie.Poster,
      title: movie.Title,
      year: movie.Year,
    }));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(searchTerm);
    setCurrentPage(1);
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Carousel items={moviesForCarousel} />
      <div
        className="form-group mt-4"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          onSubmit={handleSearchSubmit}
          style={{
            marginRight: "10px",

            width: "35%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search movies..."
            style={{ marginRight: "10px" }}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </Form>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "90%",
          margin: "0 auto",
        }}
      >
        {results.slice(startIndex, endIndex).map((movie) => (
          <Card
            key={movie.imdbID}
            url={movie.Poster}
            title={movie.Title}
            year={movie.Year}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        {[...Array(endPage - startPage + 1)].map((_, index) => (
          <button
            className="btn btn-lg mb-4"
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            style={{
              margin: 5,
              padding: "5px 10px",
              border: "1px solid #ccc",
              background:
                currentPage === startPage + index ? "#007bff" : "#fff",
              color: currentPage === startPage + index ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {startPage + index}
          </button>
        ))}
      </div>
    </div>
  );
}
