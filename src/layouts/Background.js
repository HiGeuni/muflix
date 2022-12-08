import styled from "styled-components";
import image from "static/images.jpg";

const StyledBackground = styled.div`
    position: absolute;
    display: block;
    z-index: -1;
    background-size: cover;
    height: 100%;
    width: 100%;
    background-color: #000;
    img{
        height: 0%;
        width: 0%;
    }
    @media only screen and (min-width: 740px){
        img{
            min-height: 100%;
            min-width: 100%;
        }
    }
`

const Background = () => {
    return (
        <StyledBackground>
            <img src={image} alt="" />
        </StyledBackground>
    );
}

export default Background;