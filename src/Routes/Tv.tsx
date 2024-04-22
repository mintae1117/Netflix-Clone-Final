import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { 
    getAiringTodayTves,
    getTopRatedTves, 
    getTves, 
    IGetTvResult, 
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom"
import Tvinfo from "../Components/TvInfo";
//import MovieInfo from "../Components/MovieInfo";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
  overflow-x: hidden;
`;

const ColumWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const SlideTitle = styled.h3`
    font-size: 25px;
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

const BannerDiv = styled(motion.div)`
    cursor: pointer;
    position: absolute;
    bottom: 12%;
    padding: 30px;
    border-radius: 30px;
    width: auto;
    max-width: 700px;
    min-width: 700px;
    background-color: rgba( 0, 0, 0, 0.5 );
    display: flex;
    flex-direction: column;
    &:hover{
        background-color: rgba( 0, 0, 0, 0.77 );
        transition-duration: 0.3s;
        box-shadow: gray 0px 0px 7px 0px, gray 0px 0px 1px 0px;
    }
`;

const Title = styled.h3`
  font-size: 50px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 25px;
  width: 97%;
`;

const SliderDiv = styled.div`
    position: relative;
    margin-bottom: 220px;
`;

const SliderDivLast = styled.div`
    position: relative;
    margin-bottom: 120px;
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
  height: 200px;
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

function Home() {
    const navigate = useNavigate();
    const bigMovieMatch: PathMatch< string> | null = useMatch("/tv/:category/:tvId");

    const { data: popular, isLoading: popularloading } =
    useQuery<IGetTvResult>(
        ["tvs", "popular"],
        getTves
    );
    const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetTvResult>(
        ["tvs", "topRated"], 
        getTopRatedTves
    );
    const { data: airing, isLoading: airingloading } =
    useQuery<IGetTvResult>(
        ["tvs", "airing"], 
        getAiringTodayTves
    );
    //react query get nowplaying, toprated, upcomming movies.

    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [index3, setIndex3] = useState(0);

    const [leaving, setLeaving] = useState(false);

    const increaseIndex1 = () => {
        if (popular) {
          if (leaving) return;
          toggleLeaving();
          const totalMovies = popular.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setIndex1((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };// slide 1 increase

    const increaseIndex2 = () => {
        if (topRated) {
          if (leaving) return;
          toggleLeaving();
          const totalMovies = topRated.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setIndex2((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };// slide 2 increase

    const increaseIndex3 = () => {
        if (airing) {
          if (leaving) return;
          toggleLeaving();
          const totalMovies = airing.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setIndex3((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };// slide 3 increase

    const toggleLeaving = () => setLeaving((prev) => !prev);

    const onBoxClicked = (id: number, category: string) => {
        navigate(`/tv/${category}/${id}`);
    };

    const onOverlayClick = () => navigate("/tv/");
    const clickedMovie = bigMovieMatch?.params.tvId && (popular?.results.find((movie) => movie.id === +bigMovieMatch.params.tvId!) || topRated?.results.find((movie) => movie.id === +bigMovieMatch.params.tvId!) || airing?.results.find((movie) => movie.id === +bigMovieMatch.params.tvId!));
    //수정 필요 / 완료.

    return (
    <Wrapper>
        {popularloading && topRatedLoading && airingloading ? (
        <Loader>Loading...</Loader>
        ) : (
            <ColumWrapper>
                <Banner
                    //onClick={increaseIndex}
                    bgphoto={makeImagePath(popular?.results[0].backdrop_path || "")}
                    >
                    <BannerDiv 
                        onClick={() => onBoxClicked(Number(popular?.results[0].id), "popular")}
                        layoutId={String(popular?.results[0].id) + "popular"}
                    >
                        <Title>{popular?.results[0].name}</Title>
                        <Overview>{popular?.results[0].overview}</Overview>
                    </BannerDiv>
                </Banner>
                <SliderDiv>
                    <SlideTitle>Popular Tv shows</SlideTitle>
                    <Slider>
                        <SlideBtn onClick={increaseIndex1}>Next</SlideBtn>
                        <Page>{index1 + 1} / 3</Page>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: "tween", duration: 1 }}
                            key={index1}
                            >
                            {popular?.results
                                .slice(1)
                                .slice(offset * index1, offset * index1 + offset)
                                .map((movie) => (
                                <Box
                                layoutId={movie.id + "popular"}
                                key={movie.id}
                                whileHover="hover"
                                initial="normal"
                                variants={boxVariants}
                                onClick={() => onBoxClicked(movie.id, "popular")}
                                transition={{ type: "tween" }}
                                bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                                >
                                    <Info variants={infoVariants}>
                                    <h4>{movie.name}</h4>
                                    </Info>
                                </Box>
                                ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </SliderDiv>

                <SliderDiv>
                    <SlideTitle>Top rated Tv shows</SlideTitle>
                    <Slider>
                        <SlideBtn onClick={increaseIndex2}>Next</SlideBtn>
                        <Page>{index2 + 1} / 3</Page>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: "tween", duration: 1 }}
                            key={index2}
                            >
                            {topRated?.results
                                .slice(0)
                                .slice(offset * index2, offset * index2 + offset)
                                .map((movie) => (
                                <Box
                                layoutId={movie.id + "toprated"}
                                key={movie.id}
                                whileHover="hover"
                                initial="normal"
                                variants={boxVariants}
                                onClick={() => onBoxClicked(movie.id, "toprated")}
                                transition={{ type: "tween" }}
                                bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                                >
                                    <Info variants={infoVariants}>
                                    <h4>{movie.name}</h4>
                                    </Info>
                                </Box>
                                ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </SliderDiv>

                <SliderDivLast>
                    <SlideTitle>Airing today Tv shows</SlideTitle>
                    <Slider>
                        <SlideBtn onClick={increaseIndex3}>Next</SlideBtn>
                        <Page>{index3 + 1} / 3</Page>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: "tween", duration: 1 }}
                            key={index3}
                            >
                            {airing?.results
                                .slice(0)
                                .slice(offset * index3, offset * index3 + offset)
                                .map((movie) => (
                                <Box
                                layoutId={movie.id + "airing"}
                                key={movie.id}
                                whileHover="hover"
                                initial="normal"
                                variants={boxVariants}
                                onClick={() => onBoxClicked(movie.id, "airing")}
                                transition={{ type: "tween" }}
                                bgphoto={makeImagePath(movie.backdrop_path, "w500")}
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
                            layoutId={bigMovieMatch.params.tvId + String(bigMovieMatch?.params.category)}
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
                                <BigTitle>{clickedMovie.name}</BigTitle>
                                <Tvinfo videoId={String(clickedMovie.id)} />
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
                ) : null}
                </AnimatePresence>
            </ColumWrapper>
        )}
    </Wrapper>
  );
}

export default Home;