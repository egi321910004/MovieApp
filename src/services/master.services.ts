import axios, { AxiosInstance, AxiosResponse } from "axios";

interface MovieSearchResponse {
  Search: any[];
  totalResults: number;
  Response: string;
}

const request: AxiosInstance = axios.create({
  baseURL: "http://www.omdbapi.com/",
  params: {
    apikey: "7d69a8d2",
  },
});

function fetchMoviesBySearchTerm(
  searchTerm: string,
  page: number = 1
): Promise<AxiosResponse<MovieSearchResponse>> {
  return request.get("/", {
    params: {
      s: searchTerm,
      page,
    },
  });
}

export { fetchMoviesBySearchTerm };
