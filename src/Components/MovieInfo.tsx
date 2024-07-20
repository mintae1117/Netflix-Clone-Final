import styled from "styled-components";
import { IGetDetailMovieResult, getVideoDetail } from "../api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const DetailDiv = styled.div`
    position: relative;
    padding-top: 30px;
    padding-left: 30px;
    width: 95%;
    top: -100px;
    font-size: 18px;
    font-weight: 500;
`;

const PlayBtn = styled.button`
    svg{
        margin-left: 7px;
        width: 25px;
        color: white;
    }
    cursor: pointer;
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    font-size: 17px;
    font-weight: 500;
    width: 170px;
    height: 40px;
    bottom: 7px;
    right: 5px;
    border-radius: 7px;
    border: transparent;
    color: white;
    background-color: #FF1512;
    &:hover{
        background-color: #9d0b0b;
    }
`;

export default function MovieInfo({ videoId }: { videoId: string }) {
    const navigate = useNavigate();

    const { data } = useQuery<IGetDetailMovieResult>(
        ["moviedetail", "detail"],
        () => getVideoDetail("movie", videoId)
    );

    const onClickTrailers = (videoId: string) => {
        navigate(`/trailers/${videoId}`);
    };

    return(
        <DetailDiv>
            {data?.release_date ? <p>· Release date : {data?.release_date}</p> : null}
            {data?.production_countries[0]?.name ? <p>· Country : {data?.production_countries[0]?.name}</p> : null}
            {data?.genres[0] ? <p>· Genres : {data?.genres?.map((props) => props.name + " / ")}etc.</p> : null}
            {data?.vote_average?.toFixed(1) ? <p>· Rating : {data?.vote_average?.toFixed(1)} / 10</p> : null}
            {data?.spoken_languages[0]?.english_name ? <p>· Language : {data?.spoken_languages[0]?.english_name}</p> : null}
            {data?.runtime ? <p>· Runtime : {data?.runtime}m</p> : null}
            <PlayBtn onClick={() => onClickTrailers(videoId)}>
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" />
                </svg>
                Show Trailers
            </PlayBtn>
        </DetailDiv>
    );
}