const API_KEY = "08c938092f336bc7dcbf61cca57f1a43";
const BASE_PATH = "https://api.themoviedb.org/3/";

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IGetTvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

interface IGenres {
  id: number;
  name: string;
}// 장르

interface IproductionCountries {
  iso_3166_1: string;
  name: string;
}// 제작 나라

interface IspokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}// 언어

export interface IGetDetailMovieResult {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  genres: IGenres[];
  production_countries: IproductionCountries[];
  release_date: string;
  runtime: string;
  spoken_languages: IspokenLanguages[];
  tagline: string;
  vote_average: number;
}// API로 가져온 영화 상세 정보 형식 지정

export interface IGetDetailTvResult {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  original_name: string;
  overview: string;
  genres: IGenres[];
  production_countries: IproductionCountries[];
  number_of_seasons: number;
  number_of_episodes: number;
  spoken_languages: IspokenLanguages[];
  vote_average: number;
}// API로 가져온 Tv Show 상세 정보 형식 지정

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTopRatedMovies() {
  return fetch(
      `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getUpcomingMovies() {
  return fetch(
      `${BASE_PATH}/movie/popular?api_key=${API_KEY}`
  ).then((response) => response.json());
}// movie

export function getTves() {
  return fetch(
      `${BASE_PATH}/tv/popular?api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getTopRatedTves() {
  return fetch(
      `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getAiringTodayTves() {
  return fetch(
      `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`
  ).then((response) => response.json());
}// tv

export function getSearchMovies(keyword: string) {
  return fetch(
      `${BASE_PATH}search/movie?query=${keyword}&api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getSearchTves(keyword: string) {
  return fetch(
      `${BASE_PATH}search/tv?query=${keyword}&api_key=${API_KEY}`
  ).then((response) => response.json());
}// search

export function getVideoDetail(category: "movie" | "tv", id: string) {
  return fetch(
      `${BASE_PATH}${category}/${id}?api_key=${API_KEY}`
  ).then((response) => response.json());
}// detail
