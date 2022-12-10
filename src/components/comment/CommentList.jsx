import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { api } from 'config/api';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IsLogin } from 'App';
import { useForm } from 'react-hook-form';

const Wrapper = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

const CustomDiv = styled.div`
  border: solid 2px black;
  border-radius: 5px;
  margin: 3.3%;
  width: 94%;
  max-height: 200px;
  form {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    margin: 1%;
  }
  .textField {
    resize: none;
    font-size: 18px;
    height: 100px;
    margin-bottom: 1%;
  }
  .submitButton {
    margin-left: 94%;
    font-size: 14px;
  }
`;

const CommentListArea = styled.div`
  border-top: solid black;
  margin: 3.5%;
  width: 94%;
  .topArea {
    display: flex;
    justify-content: space-between;
  }
  .commmentArea {
    padding: 0.5%;
    border-bottom: solid black;
  }
  .writer-info {
    display: block;
  }
  .writer {
    margin: 0.5%;
    font-size: 16px;
    font-weight: 600;
  }
  .write-time {
    font-size: 12px;
    color: gray;
  }
  .content {
    padding-top: 1%;
  }
`;

function CommentList() {
  const params = useParams();
  const { isLogin } = useContext(IsLogin);
  const { register, handleSubmit } = useForm();
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    await Axios.get(`${api.url}/comments/getComment/${params.index}`).then(
      (data) => {
        const d = [...data.data];
        for (let i = 0; i < d.length; i += 1) {
          d[i].write_time = d[i].write_time.replace(/[a-z]/gi, ' ');
        }
        setComments([...d]);
      },
    );
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem('loging-token');
    await Axios.post(`${api.url}/comments/newComment/${params.index}`, data, {
      headers: {
        Authorization: token,
        withCredentials: true,
        'Content-Type': 'application/json',
      },
    });
    getComments();
  };

  const onDeleteButtonClick = (id) => {
    const token = localStorage.getItem('loging-token');
    Axios.delete(`${api.url}/comments/delComment/${id}`, {
      headers: {
        Authorization: token,
        withCredentials: true,
      },
    }).then((response) => {
      if (response.status === 200) {
        getComments();
      }
      alert(response.data);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Wrapper>
      <CustomDiv>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <textarea
            className="textField"
            placeholder={isLogin ? 'Input Comment' : '로그인이 필요합니다.'}
            readOnly={!isLogin}
            {...register('comment')}
          />
          {isLogin && (
            <>
              <div>
                <input type="checkbox" {...register('anonymous')} />
                익명
              </div>
              <input type="submit" className="submitButton" value="등록" />
            </>
          )}
        </form>
      </CustomDiv>
      <CommentListArea>
        {comments.map((data) => (
          <div className="commmentArea" key={data.id}>
            <div className="topArea">
              <div className="writer-info">
                <span className="writer">{data.writer}</span>
                <div className="write-time">{data.write_time}</div>
              </div>
              <div className="buttons">
                <button type="button" className="edit-button">
                  수정
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDeleteButtonClick(data.id)}
                >
                  삭제
                </button>
              </div>
            </div>
            <div className="content">{data.comments}</div>
          </div>
        ))}
      </CommentListArea>
    </Wrapper>
  );
}

export default CommentList;
