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

export default function Tvinfo({ videoId }: { videoId: string }) {
    const { data : detailTv } = useQuery<IGetDetailTvResult>(
        ["tvdetail", "detail"],
        () => getVideoDetail("tv", videoId)
    );

    const { data : videourl } = useQuery<IGetVideo>(
        ["video", "videourl"],
        () => getVideo(videoId, "tv")
    );

    const youtubeKey = videourl?.results.filter((item) => item.site === "YouTube")[0]?.key;

    const openYoutube = () => {
        window.open(`https://www.youtube.com/embed/${youtubeKey}?rel=0&vq=hd1080&autoplay=1`);
    }
    
    return(
        <DetailDiv>
            {detailTv?.production_countries[0]?.name ? <p>· Country : {detailTv?.production_countries[0]?.name}</p> : null}
            {detailTv?.genres[0] ? <p>· Genres : {detailTv?.genres?.map((props) => props.name + " / ")}etc.</p> : null}
            {detailTv?.vote_average?.toFixed(1) ? <p>· Rating : {detailTv?.vote_average?.toFixed(1)} / 10</p> : null}
            {detailTv?.spoken_languages[0]?.english_name ? <p>· Language : {detailTv?.spoken_languages[0]?.english_name}</p> : null}
            {detailTv?.number_of_seasons ? <p>· Number of seasons : {detailTv?.number_of_seasons}</p> : null}
            {detailTv?.number_of_episodes ? <p>· Number of episodes : {detailTv?.number_of_episodes}</p> : null}
            <PlayBtn onClick={openYoutube}>
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" />
                </svg>
                Show Trailers
            </PlayBtn>
        </DetailDiv>
    );
}