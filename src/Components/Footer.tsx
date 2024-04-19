import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterDiv = styled.div`
    width: 100%;
    text-align: center;
    background-color: transparent;
`;

const Footercontent = styled.h3`
    font-size: 20px;
    margin-top: -50px;
`;

const Linka = styled.span`
    cursor: pointer;
    color: #8b8b8b;
    &:hover{
        color: #0CF474;
        transition-duration: 0.3s;
    }
`;

export default function Footer(){
    return(
        <FooterDiv>
            <Footercontent>Footer part / ©Copyright and made by <Link to={"https://github.com/mintae1117"}><Linka>mintaeKim</Linka></Link>.</Footercontent>
        </FooterDiv>
    );
}