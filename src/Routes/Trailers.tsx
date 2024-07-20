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
    padding: 30px;
    @media (max-width: 1678px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1350px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 995px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 675px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const TrailerTitleDiv = styled.div`
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #444444;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

const GoBackBtn = styled.button`
    width: auto;
    padding-left: 15px;
    padding-right: 15px;
    height: 40px;
    margin-left: 20px;
    font-size: 15px;
    background-color: white;
    border: transparent;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        background-color: #797979;
    }
`;

function Trailers () {
    const videoId = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const { data : videourl } = useQuery<IGetVideo>(
        ["video", "videourl"],
        () => getVideo(String(videoId.id), location.state.category)
    );

    const youtubeKey = videourl?.results.filter((item) => item.site === "YouTube");

    return (
        <TrailerWrapper>
            <TrailerTitleDiv>
                <h3 style={{fontSize: 50}}>Trailers About {location.state.title !== undefined ? `"${location.state.title}"` : "No Title"}</h3>
                <GoBackBtn onClick={() => navigate(-1)}>GO BACK</GoBackBtn>
            </TrailerTitleDiv>
            <TrailerGrid>
                {youtubeKey?.slice(0, 25).map((video) => (/*최대 25개 까지만 가져오기*/
                    <iframe
                        key={video.key}
                        src={`https://www.youtube.com/embed/${video.key}?rel=0&vq=hd1080&autoplay=0`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.name}
                    />
                ))}
                {youtubeKey?.length === 0 ? <h1 style={{fontSize: 30}}>No results found</h1> : null}
            </TrailerGrid>
        </TrailerWrapper>
    );
}

export default Trailers
