import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { api } from 'config/api';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IsLogin } from 'App';
import { useForm } from 'react-hook-form';
import { ReactComponent as Like } from 'static/icon/like.svg';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

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
    font-family: 'NotoSansKR';
    resize: none;
    font-size: 16px;
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
    .info-area {
      display: flex;
      align-items: center;
      .writer-info {
        display: block;
        .writer {
          margin: 0.5%;
          font-size: 16px;
          font-weight: 600;
        }
        .write-time {
          font-size: 12px;
          color: gray;
        }
      }
      .buttons {
        min-width: 100px;
        margin: auto;
        .btn{
          border: none;
          background-color: #fff;
          color: gray;
        }
      }
    }
    .good {
      min-width: 100px;
      display: flex;
      align-items: center;
      border 1px solid;
      border-radius: 5px;
      .good-button{
        display: flex;
        align-items: center;
        border: none;
        background: none;
      }
      .upvote {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
  .commmentArea {
    padding: 0.5%;
    border-bottom: solid black;
  }
  .content {
    white-space: pre-wrap;
    padding-top: 1%;
  }
`;

function CommentList() {
  const params = useParams();
  const { isLogin } = useContext(IsLogin);
  const { register, handleSubmit, reset } = useForm();
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
    toast('댓글 작성이 완료되었습니다.');
    reset();
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
    });
  };

  const onClickLikeBtn = (id) => {
    Axios.put(`${api.url}/comments/upvote/${id}`, {}).catch((e) =>
      console.log(e),
    );
    setComments((prev) => {
      let tempComment = [...prev];
      for (let i = 0; i < prev.length; ++i) {
        if (tempComment[i].id === id) {
          tempComment[i].upvote += 1;
          break;
        }
      }
      return tempComment;
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Wrapper>
      <CustomDiv>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
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
              <div className="info-area">
                <div className="writer-info">
                  <span className="writer">{data.writer}</span>
                  <div className="write-time">{data.write_time}</div>
                </div>
                <div className="buttons">
                  {/* <button type="button" className="btn edit-button">
                    수정
                  </button> */}
                  <button
                    type="button"
                    className="btn delete-button"
                    onClick={() => onDeleteButtonClick(data.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="good">
                <button
                  className="good-button"
                  onClick={() => {
                    console.log(data.comments);
                    onClickLikeBtn(data.id);
                  }}
                >
                  <Like />
                </button>
                <div className="upvote">{data.upvote}</div>
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
