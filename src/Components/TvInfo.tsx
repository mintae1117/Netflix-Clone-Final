import styled from "styled-components";
import { IGetDetailTvResult, getVideoDetail } from "../api";
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

export default function Tvinfo({ videoId }: { videoId: string }) {
    const { data } = useQuery<IGetDetailTvResult>(
        ["tv", "detail"],
        () => getVideoDetail("tv", videoId)
    );
    
    return(
        <DetailDiv>
            <p>· Country : {data?.production_countries[0]?.name}</p>
            <p>· Genres : {data?.genres?.map((props) => props.name + " / ")}etc.</p>
            <p>· Rating : {data?.vote_average?.toFixed(1)} / 10</p>
            <p>· Language : {data?.spoken_languages[0]?.english_name}</p>
            <p>· Number of seasons : {data?.number_of_seasons}</p>
            <p>· Number of episodes : {data?.number_of_episodes}</p>
        </DetailDiv>
    );
}