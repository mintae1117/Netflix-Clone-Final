import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IGetVideo, getVideo } from "../api";
import styled from "styled-components";

const TrailerWrapper = styled.div`
    min-height: 90vh;
    height: 100%;
    width: 100%;
    margin-bottom: 50px;
`;

const TrailerGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
`;

function Trailers () {
    const videoId = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    //console.log("asfrshdrgdkngdjkgfndisufnsijfn", location);

    const { data : videourl } = useQuery<IGetVideo>(
        ["video", "videourl"],
        () => getVideo(String(videoId.id), location.state)
    );

    const youtubeKey = videourl?.results.filter((item) => item.site === "YouTube");

    return (
        <TrailerWrapper>
            <div style={{display:"flex", height: 200, alignItems:"center", justifyContent:"center", textAlign:"center"}}>
                <h1 style={{fontSize: 50}}>Show Trailers</h1>
                <button onClick={() => navigate(-1)}>뒤로가기</button>
            </div>
            <TrailerGrid>
                {youtubeKey?.map((video) => (
                    <iframe
                        key={video.key}
                        src={`https://www.youtube.com/embed/${video.key}?rel=0&vq=hd1080&autoplay=0`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.name}
                    />
                ))}
            </TrailerGrid>
        </TrailerWrapper>
    );
}

export default Trailers
