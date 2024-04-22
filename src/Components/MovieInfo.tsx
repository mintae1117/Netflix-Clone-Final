import styled from "styled-components";
import { IGetDetailMovieResult, getVideoDetail } from "../api";
import { useQuery } from "react-query";

const DetailDiv = styled.div`
    position: relative;
    padding-top: 30px;
    padding-left: 30px;
    width: 90%;
    top: -100px;
    font-size: 18px;
    font-weight: 500;
`;

export default function MovieInfo({ videoId }: { videoId: string }) {
    const { data } = useQuery<IGetDetailMovieResult>(
        ["moviedetail", "detail"],
        () => getVideoDetail("movie", videoId)
    );
    
    return(
        <DetailDiv>
            <p>· Release date : {data?.release_date}</p>
            <p>· Country : {data?.production_countries[0]?.name}</p>
            <p>· Genres : {data?.genres?.map((props) => props.name + " / ")}etc.</p>
            <p>· Rating : {data?.vote_average?.toFixed(1)} / 10</p>
            <p>· Language : {data?.spoken_languages[0]?.english_name}</p>
            <p>· Runtime : {data?.runtime}m</p>
        </DetailDiv>
    );
}