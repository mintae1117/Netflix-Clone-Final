import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { 
    getMovies, 
    getTopRatedMovies, 
    getUpcomingMovies, 
    IGetMoviesResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom"
import MovieInfo from "../Components/MovieInfo";
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
    min-height: 300px;
    background-color: rgba( 0, 0, 0, 0.5 );
    display: flex;
    gap: 20px;
    flex-direction: column;
    &:hover{
        background-color: rgba( 0, 0, 0, 0.77 );
        transition-duration: 0.3s;
        box-shadow: gray 0px 0px 7px 0px, gray 0px 0px 1px 0px;
    }
`;

/*const Title = styled.h3`
  font-size: 50px;
  margin-bottom: 20px;
`;*/

/*const Overview = styled.p`
  font-size: 25px;
  width: 90%;
  margin-top: 10px;
`;*/

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
    width: 210px;
    height: 300px;
    background-size: cover;
    background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 25px;
  font-size: 30px;
  position: relative;
  white-space : nowrap;
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
    const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:category/:movieId");

    const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getMovies
    );
    const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(
        ["movies", "topRated"], 
        getTopRatedMovies
    );
    const { data: upComing, isLoading: upComingLoading } =
    useQuery<IGetMoviesResult>(
        ["movies", "upComing"], 
        getUpcomingMovies
    );
    //react query get nowplaying, toprated, upcomming movies.

    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [index3, setIndex3] = useState(0);

    const [leaving, setLeaving] = useState(false);

    const increaseIndex1 = () => {
        if (nowPlaying) {
          if (leaving) return;
          toggleLeaving();
          const totalMovies = nowPlaying.results.length - 1;
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
        if (upComing) {
          if (leaving) return;
          toggleLeaving();
          const totalMovies = upComing.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setIndex3((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };// slide 3 increase

    const toggleLeaving = () => setLeaving((prev) => !prev);

    const onBoxClicked = (movieId: number, category: string) => {
        navigate(`/movies/${category}/${movieId}`);
    };

    const onOverlayClick = () => navigate("/");
    const clickedMovie = bigMovieMatch?.params.movieId && (nowPlaying?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId!) || topRated?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId!) || upComing?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId!));
    //수정 필요 / 완료.

    return (
    <Wrapper>
        {nowPlayingLoading && topRatedLoading && upComingLoading ? (
        <Loader>Loading...</Loader>
        ) : (
            <ColumWrapper>
                <Banner
                    //onClick={increaseIndex}
                    bgphoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
                    >
                    { nowPlaying?.results[0].title === undefined ? null : 
                      <BannerDiv 
                      onClick={() => onBoxClicked(Number(nowPlaying?.results[0].id), "nowplaying")}
                      layoutId={String(nowPlaying?.results[0].id) + "nowplaying"}
                      >
                        <TypeAnimation
                        cursor= {false}
                        sequence={[
                            `${nowPlaying?.results[0].title}`,
                            1000
                        ]}
                        speed={70}
                        style={{ fontSize: '3.3em' }}// banner title text animation.
                        />
                        <TypeAnimation
                        sequence={[
                            1000,
                            `${nowPlaying?.results[0].overview}`,
                            1000
                        ]}
                        speed={80}
                        style={{ fontSize: '1.7em', marginRight: '10px' }}// banner overview text animation.
                        />
                      </BannerDiv>
                    }
                </Banner>
                <SliderDiv>
                    <SlideTitle>Now playing Movies</SlideTitle>
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
                            key={index1}// framer motion animation for slider row.
                            >
                            {nowPlaying?.results
                                .slice(1)
                                .slice(offset * index1, offset * index1 + offset)
                                .map((movie) => (
                                <Box
                                layoutId={movie.id + "nowplaying"}
                                key={movie.id}
                                whileHover="hover"
                                initial="normal"
                                variants={boxVariants}
                                onClick={() => onBoxClicked(movie.id, "nowplaying")}
                                transition={{ type: "tween" }}
                                bgphoto={makeImagePath(movie.backdrop_path, "w500")}// framer motion animation for slider box.
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

                <SliderDiv>
                    <SlideTitle>Top rated Movies</SlideTitle>
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
                                    <h4>{movie.title}</h4>
                                    </Info>
                                </Box>
                                ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </SliderDiv>

                <SliderDivLast>
                    <SlideTitle>Up comming Movies</SlideTitle>
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
                            {upComing?.results
                                .slice(0)
                                .slice(offset * index3, offset * index3 + offset)
                                .map((movie) => (
                                <Box
                                layoutId={movie.id + "upcomming"}
                                key={movie.id}
                                whileHover="hover"
                                initial="normal"
                                variants={boxVariants}
                                onClick={() => onBoxClicked(movie.id, "upcomming")}
                                transition={{ type: "tween" }}
                                bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                                >
                                    <Info variants={infoVariants}>
                                    <h4>{movie.title}</h4>
                                    </Info>
                                </Box>
                                ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </SliderDivLast>
                
                <AnimatePresence>
                {bigMovieMatch ? (
                    <div>
                        <Overlay
                            onClick={onOverlayClick}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                        <BigMovie
                            layoutId={bigMovieMatch.params.movieId + String(bigMovieMatch?.params.category)}
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
                    </div>
                ) : null}
                </AnimatePresence>
            </ColumWrapper>
        )}
    </Wrapper>
  );
}

export default Home;