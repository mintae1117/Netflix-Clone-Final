import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IGetVideo, getVideo } from "../api";
import styled from "styled-components";

const TrailerWrapper = styled.div`
    min-height: 100vh;
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

    const { data : videourl } = useQuery<IGetVideo>(
        ["video", "videourl"],
        () => getVideo(String(videoId.id), "movie")
    );

    // const youtubeKey = videourl?.results.filter((item) => item.site === "YouTube")[0]?.key;
    const youtubeKey = videourl?.results.filter((item) => item.site === "YouTube");
    console.log("youtubeKeyyoutubeKeyyoutubeKeyyoutubeKeyyoutubeKeyyoutubeKey", youtubeKey)

    return (
        <TrailerWrapper>
            <div style={{display:"flex", height: 200, alignItems:"center", justifyContent:"center", textAlign:"center"}}>
                <h1>Trailers</h1>
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

// id
// : 
// "6674f0f178b39f538271e0ec"
// iso_639_1
// : 
// "en"
// iso_3166_1
// : 
// "US"
// key
// : 
// "RY5aH21ohU4"
// name
// : 
// "Time to Celebrate"
// official
// : 
// true
// published_at
// : 
// "2024-06-19T17:41:37.000Z"
// site
// : 
// "YouTube"
// size
// : 
// 1080
// type
// : 
// "Teaser"