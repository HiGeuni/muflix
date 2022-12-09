import Axios from "axios";
import { api } from "config/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const CommentListArea = styled.div`
    border-top: solid black;
    margin: 3.5%;
    width: 94%;
    .topArea {
        display: flex;
        justify-content: space-between;
    }
    .commmentArea {
        padding: 1%;
        border-bottom: solid black;
    }
    .writer-info {
        display: block;
    }
    .writer {
        margin: 1%;
        font-size: 18px;
        font-weight: 700;
    }
    .write-time{
        font-size: 14px;
        color: gray;
    }
    .content {
        padding-top:1%;
    }
`

const CommentList = () => {
    const params = useParams();
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        await Axios.get(`${api.url}/comments/getComment/${params.index}`)
        .then((data) => {
            console.log(...data.data);
            setComments([...data.data]);
        })
    }

    const onDeleteButtonClick = (id) => {
        console.log("id : ", id);
        const token = localStorage.getItem('loging-token');
        Axios.delete(`${api.url}/comments/delComment/${id}`,{
            headers:{
                "Authorization": token,
                "withCredentials": true,
            }
        })
        .then(response => {
            console.log(response);
            alert(response.data);
        });
    }

    useEffect(() => {
        getComments();
    }, []);

    return (
        <CommentListArea>
            {
                comments.map((data) => (
                    <div className="commmentArea" key = {data.id}>
                        <div className="topArea">
                            <div className="writer-info">
                                <span className="writer">{data.writer}</span>
                                <div className="write-time">{data.write_time}</div>
                            </div>
                            <div className="buttons">
                                <button className="edit-button">수정</button>
                                <button className="delete-button" onClick={() => onDeleteButtonClick(data.id)}>삭제</button>
                            </div>
                        </div>
                        <div className="content">
                            {data.comments}  
                        </div>
                    </div>
                ))
            }
        </CommentListArea>
    );
}

export default CommentList;