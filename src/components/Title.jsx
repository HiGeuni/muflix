import styled from "styled-components"

const CustomDiv = styled.div`
    font-family:"noto-sans";
    font-weight:600;
    // display: flex;
    text-align: center;
    justify-content: center;
    margin-top: 3%;
    margin-bottom: 3%;
`

const Title = ({name}) => {
    return (
        <CustomDiv>
            <h2>{name}</h2>
        </CustomDiv>
    )
}

export default Title;