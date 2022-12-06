import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentData from "../data.json";

const CommentArea = styled.div`
    border: solid 1px gray;
    // padding: 10px;
`

const UserId = styled.div`
    background-color : #f3f3f3;
    color : black;
    font-weight: 700;
    font-size: 18px;
`

const Content = styled.div`
    font-weight: 500;
    font-size: 18px;
    color: #3c3c3c;
`

const Time = styled.div`
    font-weight: 300;
    color : gray;
    font-size: 12px;
`

const CustomDiv = styled.div`
    border: solid 2px black;
    margin : 3.5%;
    // display : flex;
    width : 93%;
    height : 500px;
    // color : white;
    // font-size : 24px;
    // background-color : #777777;
    // justify-content: center;
`

const Comment = () => {
    return (
        <CustomDiv>
            {
                CommentData.comments?.map((s) => (
                    <CommentArea key={s.id}>
                        <UserId>
                            {s.userName}
                        </UserId>
                        <Content>
                            {s.content}
                        </Content>
                        <Time>
                            {s.time}
                        </Time>
                    </CommentArea>
                ))
            }
        </CustomDiv>
    )
}

export default Comment;