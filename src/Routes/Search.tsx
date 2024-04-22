/*import { useLocation } from "react-router";

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    console.log(keyword);
    return (
        <>
        <h1>Search</h1>
        <h2>"{keyword}" 검색결과</h2>
        </>
    );
}
export default Search;*/

import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { 
    getSearchMovies, 
    getSearchTves, 
    IGetMoviesResult,
    IGetTvResult, 
} from "../api";
import { makeImagePath } from "../utils";
import { useEffect, useState } from "react";
import { PathMatch, useMatch, useNavigate, useSearchParams } from "react-router-dom"
import MovieInfo from "../Components/MovieInfo";
import Tvinfo from "../Components/TvInfo";
import { TypeAnimation } from "react-type-animation";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
  overflow-x: hidden;
`;

const ColumWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const SearchTitleDiv = styled.div`
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #444444;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideTitle = styled.h3`
    font-size: 27px;
    padding: 10px;
`;

const SlideBtn = styled.button`
    cursor: pointer;
    font-size: 17px;
    font-weight: 500;
    width: 70px;
    position: absolute;
    right: 1%;
    top: -40px;
    border-color: transparent;
    color: white;
    border-radius: 15px;
    background-color: rgba( 0, 0, 0, 0.5 );
    box-shadow: white 0px 0px 7px 0px, white 0px 0px 1px 0px;
    &:hover{
        background-color: #2a2a2a;
    }
`;

const Page = styled.h4`
    font-size: 17px;
    position: absolute;
    right: 110px;
    top: -35px;
`;

const SliderDiv = styled.div`
    position: relative;
    margin-bottom: 430px;
`;

const SliderDivLast = styled.div`
    position: relative;
    margin-bottom: 350px;
`;

const Slider = styled.div`
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 7px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: #464646;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 400px;
  font-size: 66px;
  border-radius: 5px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  cursor: pointer;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Xbtn = styled.div`
    cursor: pointer;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: tomato;
    color: black;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 500;
    margin: 7px;
    position: fixed;
    display: flex;
    &:hover{
        background-color: red;
    }
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  top: 10%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40vw;
  height: 80vh;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const PosterCover = styled.div`
    position: absolute;
    top: 33px;
    left: 30px;
    width: 30%;
    height: 300px;
    background-size: cover;
    background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 25px;
  font-size: 30px;
  position: relative;
  top: -70px;
`;

const BigOverview = styled.p`
  padding-left: 25px;
  margin-top: 15px;
  position: relative;
  font-size: 19px;
  top: -100px;
  width: 95%;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
    normal: {
      scale: 1,
    },
    hover: {
      scale: 1.3,
      y: -20,
      transition: {
        delay: 0.5,
        duaration: 0.3,
        type: "tween",
      },
    },
};

const infoVariants = {
    hover: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
};

const offset = 6;

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get(`keyword`);// get keyword.
    const [nowkeyword, setnowkeyword] = useState(keyword);// save present keyword.
    
    const navigate = useNavigate();
    const bigMovieMatch: PathMatch< string> | null = useMatch("/Netflix-Clone-Final/search/movies/:movieId");
    const bigTvMatch: PathMatch< string> | null = useMatch("/Netflix-Clone-Final/search/tv/:movieId");

    const {
        data: movieSearch,
        isLoading: movieSearchLoading,
        refetch: movieRefetch,
    } = useQuery<IGetMoviesResult>(["searchmovies", "nowPlaying"], () =>
        getSearchMovies(String(keyword))
    );
    const {
        data: tvSearch,
        isLoading: tvSearchLoading,
        refetch: tvRefetch,
    } = useQuery<IGetTvResult>(["searchtvs", "nowPlaying"], () =>
        getSearchTves(String(keyword))
    );// get searched data of movie and tv shows.

    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        movieRefetch();
        tvRefetch();
        setLeaving(false);
        setnowkeyword(keyword);
    }, [keyword, movieRefetch, tvRefetch]);// watch for the keyword change to refetch data.

    const increaseIndex1 = () => {
        if (movieSearch) {
          if (leaving) return;
          toggleLeaving();
          const totalMovies = movieSearch.results.length;
          const maxIndex = Math.floor(totalMovies / offset);
          setIndex1((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }
    };// slide 1 increase

    const increaseIndex2 = () => {
        if (tvSearch) {
          if (leaving) return;
          toggleLeaving();
          const totalMovies = tvSearch.results.length;
          const maxIndex = Math.floor(totalMovies / offset);
          setIndex2((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }
    };// slide 2 increase

    const toggleLeaving = () => setLeaving((prev) => !prev);

    const onMovieClicked = (movieId: number) => {
        navigate(`/Netflix-Clone-Final/search/movies/${movieId}?keyword=${keyword}`);
    };

    const onTvClicked = (movieId: number) => {
        navigate(`/Netflix-Clone-Final/search/tv/${movieId}?keyword=${keyword}`);
    };

    const onOverlayClick = () => navigate(`/Netflix-Clone-Final/search?keyword=${keyword}`);

    const clickedMovie = bigMovieMatch?.params.movieId && (movieSearch?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId!));
    const clickedTv = bigTvMatch?.params.movieId && (tvSearch?.results.find((movie) => movie.id === +bigTvMatch.params.movieId!));
    // match clicked movie or tv shows to get data on modal box.

    return (
    <Wrapper>
        {movieSearchLoading && tvSearchLoading ? (
        <Loader>Loading...</Loader>
        ) : (
            <ColumWrapper>
                <SearchTitleDiv>
                    { keyword === nowkeyword ? <TypeAnimation
                        preRenderFirstString={true}
                        sequence={[
                            'Search ', // initially rendered starting point.
                            10,
                            `Search results about "${nowkeyword}".`,
                            1000,
                        ]}
                        speed={50}
                        style={{ fontSize: '3.5em' }}// showing keyword title using react-type-animation.
                    /> : "No keyword."}
                </SearchTitleDiv>
                <SliderDiv>
                    <SlideTitle>Searched Movies
                        <span style={{fontSize: "17px"}}>
                            {movieSearch?.results.length !== 0 ? 
                            ` / Found ${movieSearch?.results.length} results.` : " / No results found." }
                        </span>
                    </SlideTitle>
                    <Slider>
                        <SlideBtn onClick={increaseIndex1}>Next</SlideBtn>
                        <Page>{index1 + 1} / {movieSearch ? Math.floor(movieSearch?.results.length / offset) + 1 : 1}</Page>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: "tween", duration: 1 }}
                            key={index1}
                            >
                            {movieSearch?.results
                                .slice(0)
                                .slice(offset * index1, offset * index1 + offset)
                                .map((movie) => (
                                <Box
                                layoutId={movie.id + ""}
                                key={movie.id}
                                whileHover="hover"
                                initial="normal"
                                variants={boxVariants}
                                onClick={() => onMovieClicked(movie.id)}
                                transition={{ type: "tween" }}
                                bgphoto={makeImagePath(movie.poster_path, "w500")}
                                >
                                    <Info variants={infoVariants}>
                                    <h4>{movie.title}</h4>
                                    </Info>
                                </Box>
                                ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </SliderDiv>

                <SliderDivLast>
                    <SlideTitle>Searched Tv shows
                        <span style={{fontSize: "17px"}}>
                            {tvSearch?.results.length !== 0 ? ` / Found ${tvSearch?.results.length} results.` 
                            : " / No results found." }
                        </span>
                    </SlideTitle>
                    <Slider>
                        <SlideBtn onClick={increaseIndex2}>Next</SlideBtn>
                        <Page>{index2 + 1} / {tvSearch ? Math.floor(tvSearch?.results.length / offset) + 1 : 1}</Page>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: "tween", duration: 1 }}
                            key={index2}
                            >
                            {tvSearch?.results
                                .slice(0)
                                .slice(offset * index2, offset * index2 + offset)
                                .map((movie) => (
                                <Box
                                layoutId={movie.id + ""}
                                key={movie.id}
                                whileHover="hover"
                                initial="normal"
                                variants={boxVariants}
                                onClick={() => onTvClicked(movie.id)}
                                transition={{ type: "tween" }}
                                bgphoto={makeImagePath(movie.poster_path, "w500")}
                                >
                                    <Info variants={infoVariants}>
                                    <h4>{movie.name}</h4>
                                    </Info>
                                </Box>
                                ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </SliderDivLast>

                <AnimatePresence>
                {bigMovieMatch ? (
                    <>
                        <Overlay
                            onClick={onOverlayClick}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                        <BigMovie
                            layoutId={bigMovieMatch.params.movieId}
                        >
                            <Xbtn onClick={onOverlayClick}>
                              <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                            </Xbtn>
                            {clickedMovie && (
                            <>
                                <BigCover
                                style={{
                                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                    clickedMovie.backdrop_path,
                                    "w500"
                                    )})`,
                                }}
                                />
                                <BigTitle>{clickedMovie.title}</BigTitle>
                                <MovieInfo videoId={String(clickedMovie.id)} />
                                <BigOverview>{clickedMovie.overview}</BigOverview>
                                <PosterCover style={{
                                    backgroundImage: `url(${makeImagePath(
                                    clickedMovie.poster_path,
                                    "w500"
                                    )})`,
                                }}></PosterCover>
                            </>
                            )}
                        </BigMovie>
                    </>
                ) : null /* For clicked movies */}
                </AnimatePresence>

                <AnimatePresence>
                {bigTvMatch ? (
                    <>
                        <Overlay
                            onClick={onOverlayClick}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                        <BigMovie
                            layoutId={bigTvMatch.params.movieId}
                        >
                            <Xbtn onClick={onOverlayClick}>
                              <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                            </Xbtn>
                            {clickedTv && (
                            <>
                                <BigCover
                                style={{
                                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                        clickedTv.backdrop_path,
                                    "w500"
                                    )})`,
                                }}
                                />
                                <BigTitle>{clickedTv.name}</BigTitle>
                                <Tvinfo videoId={String(clickedTv.id)} />
                                <BigOverview>{clickedTv.overview}</BigOverview>
                                <PosterCover style={{
                                    backgroundImage: `url(${makeImagePath(
                                    clickedTv.poster_path,
                                    "w500"
                                    )})`,
                                }}></PosterCover>
                            </>
                            )}
                        </BigMovie>
                    </>
                ) : null/* For clicked tv shows */}
                </AnimatePresence>

            </ColumWrapper>
        )}
    </Wrapper>
  );
}

export default Search;
