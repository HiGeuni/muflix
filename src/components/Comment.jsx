import React, { useEffect } from "react";
import styled from "styled-components";

const CustomDiv = styled.div`
    margin: 3.5%;
    display : flex;
    width : 93%;
    height : 500px;
    color : white;
    font-size : 24px;
    background-color : #777777;
    justify-content: center;
`

const Comment = () => {
    return (
        <CustomDiv>
            This is Comment Component
        </CustomDiv>
    )
}

export default Comment;