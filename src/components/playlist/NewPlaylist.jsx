// react-hook-form을 이용해서 form을 만들기
import { useForm } from 'react-hook-form';
// import NewStyle from "styles/FormStyle";
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { api } from 'config/api';
import Slider from 'react-slick';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Background from 'layouts/Background';
import { toast } from 'react-toastify';

import 'styles/slick-theme-for-background.css';
import 'styles/slick.css';

const UnMarkedli = styled.li`
  display: block;
  align-items: center;
  list-style: none;
  margin-left: 16%;
`;

const CustomDiv = styled.div`
  display: inline-block;
  max-width: 1100px;
  height: 100%;
  img {
    display: block;
    width: 200px;
    height: 200px;
  }
  span {
    color: white;
  }
  .radio {
    min-width: 200px;
    color: white;
  }
  margin-left: auto;
  margin-right: auto;
`;

const SizedBox = styled.div`
  display: block;
  height: 50px;
`;

const NewStyle = styled.div`
  display: block;
  background-color: black;
  margin: 5%;
  @media only screen and (min-width: 740px) {
    background-color: rgba(0, 0, 0, 0.9);
    padding: 60px;
    max-width: 900px;
    min-height: 85vh;
    margin: auto;
  }
  h2 {
    color: white;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    margin: 5px;
    font-size: 14px;
    font-weight: 600;
    color: white;
  }
  input {
    margin: 4px;
    border: 0;
    border-radius: 2px;
    padding: 10px;
    color: #fff;
    background: #333;
    line-height: 18px;
  }
  .submitButton {
    margin-top: 0.83em;
    background-color: red;
    color: white;
    font-weight: 800;
    font-size: 20px;
  }
  .isUser {
    margin-top: 0.83em;
    color: gray;
  }
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  draggable: true, // 드래그 가능 여부
  responsive: [
    {
      breakpoint: 840,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

function NewPlayListForm() {
  const { register, handleSubmit } = useForm();
  const [musicData, setData] = useState(null);
  const [playlistData, setPlayListData] = useState();
  const [resList, setRes] = useState([]);
  const [repSong, setRepSong] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.index;

  const getData = async () => {
    await Axios.get(`${api.url}/musics/getAllMusics`).then((res) => {
      setData(res.data);
    });
  };

  const fetchData = async () => {
    await Axios.get(`${api.url}/musics/getPlaylist/${params.index}`).then(
      (d) => {
        setPlayListData(d.data.playlist_info);
      },
    );
  };

  useEffect(() => {
    if (isEdit) {
      fetchData();
    }
    getData();
  }, []);

  const onChange = (id, e) => {
    if (resList.includes(id)) {
      setRes(resList.filter((el) => el !== id));
    } else {
      setRes((prev) => [...prev, id]);
    }
  };

  const onSubmit = async (data) => {
    if (data.name === '') {
      data.name = playlistData?.name;
    }
    if (data.information === '') {
      data.information = playlistData?.information;
    }
    if (repSong === null) {
      toast('대표곡을 지정해주세요.');
      return;
    }
    data.representative = repSong;
    data.musics = resList;
    if (!resList.includes(repSong)) {
      data.musics.push(repSong);
    }
    const token = localStorage.getItem('loging-token');
    const headers = {
      Authorization: token,
      withCredentials: true,
      'Content-Type': 'application/json',
    };
    isEdit
      ? await Axios.put(
          `${api.url}/musics/updatePlaylist/${params.index}`,
          data,
          {
            headers,
          },
        )
      : await Axios.post(`${api.url}/musics/addPlaylist`, data, {
          headers,
        }).then((res) => {
          console.log(res);
        });
    navigate('/');
  };

  return (
    <>
      <Background />
      <NewStyle>
        <h2>{isEdit ? 'Edit Playlist' : 'New Playlist'}</h2>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <label>Playlist name</label>
          <input
            type="text"
            name="name"
            defaultValue={playlistData?.name}
            placeholder="Playlist Name"
            {...register('name')}
          />
          <label>Playlist information</label>
          <input
            type="text"
            name="information"
            defaultValue={playlistData?.information}
            placeholder="Playlist Information"
            {...register('information')}
          />

          <Slider {...settings}>
            {musicData?.map((s) => (
              <UnMarkedli key={s.id}>
                <CustomDiv>
                  <input
                    type="checkbox"
                    name={`${s.id}`}
                    onChange={(e) => {
                      onChange(s.id, e);
                    }}
                  />
                  <img
                    src={s.album_cover}
                    className="Album-Cover"
                    alt="Album"
                  />{' '}
                  <br />
                  <span>
                    Title : {s.name} <br />
                    Singer : {s.singer}
                  </span>
                  <div className="radio">
                    <input
                      type="radio"
                      value={s.name}
                      name="represent"
                      onChange={() => {
                        setRepSong(s.id);
                      }}
                    />
                    대표 곡
                  </div>
                </CustomDiv>
              </UnMarkedli>
            ))}
          </Slider>
          <SizedBox />
          <input type="submit" className="submitButton" value="등록" />
        </form>
      </NewStyle>
    </>
  );
}

export default NewPlayListForm;
