import styled from "styled-components";
import { IGetDetailTvResult, IGetVideo, getVideo, getVideoDetail } from "../api";
import { useQuery } from "react-query";

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
    }
    cursor: pointer;
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    font-size: 17px;
    width: 150px;
    height: 35px;
    bottom: 7px;
    right: 10px;
    border-radius: 10px;
    border: transparent;
    &:hover{
        background-color: #a5a5a5;
    }
`;

export default function Tvinfo({ videoId }: { videoId: string }) {
    const { data : detailTv } = useQuery<IGetDetailTvResult>(
        ["tvdetail", "detail"],
        () => getVideoDetail("tv", videoId)
    );

    const { data : videourl } = useQuery<IGetVideo>(
        ["video", "videourl"],
        () => getVideo(videoId, "tv")
    );

    const youtubeKey = videourl?.results.filter((item) => item.site === "YouTube")[0]
    ?.key;

    const openYoutube = () => {
        window.open(`https://www.youtube.com/embed/${youtubeKey}?rel=0&vq=hd1080&autoplay=1`);
    }
    
    return(
        <DetailDiv>
            <p>· Country : {detailTv?.production_countries[0]?.name}</p>
            <p>· Genres : {detailTv?.genres?.map((props) => props.name + " / ")}etc.</p>
            <p>· Rating : {detailTv?.vote_average?.toFixed(1)} / 10</p>
            <p>· Language : {detailTv?.spoken_languages[0]?.english_name}</p>
            <p>· Number of seasons : {detailTv?.number_of_seasons}</p>
            <p>· Number of episodes : {detailTv?.number_of_episodes}</p>
            <PlayBtn onClick={openYoutube}>
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" />
                </svg>
                Play Trailer
            </PlayBtn>
        </DetailDiv>
    );
}