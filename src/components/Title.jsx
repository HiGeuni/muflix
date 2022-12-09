import styled from "styled-components"

const CustomDiv = styled.div`
    font-family:"noto-sans";
    font-weight:600;
    justify-content: center;
    margin-top: 3%;
    margin-left: 13%;
    margin-right: 13%;
    // color: gray;
`

const Title = ({name}) => {
    return (
        <CustomDiv>
            <h2>{name}</h2>
        </CustomDiv>
    )
}

export default Title;