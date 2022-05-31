/* eslint-disable max-len */
import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Router from 'next/router';

import wrapper, { SagaStore } from '../store/configureStore';
import { loadMyInfoRequest } from '../reducers/user/user';
import { loadPostsRequest } from '../reducers/post/post';
import { RootState } from '../reducers';
import AuthLayout from '../components/auth/AuthLayout';
import { PostsProps } from '../reducers/post/postType';
import RowCards from '../components/auth/RowCards';

const Btn = styled.button`
  /* margin: 0 20px; */
  background-color: #fff;
  border: 1px solid gray;
  width: 90%;
  height: 30px;
  cursor: pointer;
  position: absolute;
  bottom: -20px;

  @media (min-width: 768px) and (max-width: 991px) {
    width: 50%;
  }
  @media (max-width: 767px) {
    width: 80%;
  }
`;
const HeaderBtn = styled.button`
  margin: 0 20px;
  background-color: #fff;
  border: 1px solid gray;
  width: 80px;
  height: 30px;
  cursor: pointer;
  margin: 20px 0;
`;
const CBoxContainer = styled.div`
  width: 100%;
  display: flex;
  @media (min-width: 768px) and (max-width: 991px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`;

const CBox = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  align-items: center;
  position: relative;
  @media (min-width: 768px) and (max-width: 991px) {
    margin-bottom: 0;
  }
  @media (max-width: 767px) {
    margin-bottom: 0;
  }
`;
const SHeader = styled.div`
  width: 100%;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 30px;
  font-size: 30px;
`;

const Img = styled.img`
  width: 100%;
  height: 400px;
`;
const Info = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  span {
    font-size: 15px;
    word-spacing: 2px;
    letter-spacing: 2px;
  }
`;

const Home: NextPage = () => {
  const { mainPosts } = useSelector((state: RootState) => state.post);

  const onFeedClick = useCallback(() => {
    Router.push('/feed');
  }, []);

  const onKoreaClick = useCallback(() => {
    Router.push('/category/한식');
  }, []);
  const onJapanClick = useCallback(() => {
    Router.push('/category/일식');
  }, []);
  const onChinaClick = useCallback(() => {
    Router.push('/category/중식');
  }, []);
  const onEuClick = useCallback(() => {
    Router.push('/category/양식');
  }, []);
  return (
    <AuthLayout>
      <CBoxContainer>
        <CBox>
          <SHeader>한식</SHeader>
          <Img src="bibimbap.jpg" alt="img" />
          <Info>
            <h1>비빔밥</h1>
            <span>
              쌀밥에 고기나 나물 등과 여러 가지 양념을 넣어 비벼 먹는 음식이며, 부빔밥이나 제삿밥, 골동반(骨董飯),
              교반(攪飯)으로도 부른다.
            </span>
          </Info>
          <Btn type="button" onClick={onKoreaClick}>
            더보기
          </Btn>
        </CBox>
        <CBox>
          <SHeader>일식</SHeader>
          <Img src="ramen.jpg" alt="img" />
          <Info>
            <h1>라맨</h1>
            <span>라멘(일본어: ラーメン)은 일본식 중화 국수 요리이다. 일본의 국민 음식 가운데 하나로 여겨진다.</span>
          </Info>
          <Btn type="button" onClick={onJapanClick}>
            더보기
          </Btn>
        </CBox>
        <CBox>
          <SHeader>중식</SHeader>
          <Img src="jajangmyeon.jpg" alt="img" />
          <Info>
            <h1>짜장면</h1>
            <span>
              짜장면(--麵) 또는 자장면(--麵)은 양파 등 채소와 돼지고기에 춘장을 넣어 식용유와 함께 볶은 양념을 굵은
              국수에 비벼서 먹는다
            </span>
          </Info>
          <Btn type="button" onClick={onChinaClick}>
            더보기
          </Btn>
        </CBox>
        <CBox>
          <SHeader>양식</SHeader>
          <Img src="pasta.jpg" alt="img" />
          <Info>
            <h1>파스타</h1>
            <span>
              파스타(이탈리아어: pasta)는 팽창시킨 밀가루 반죽에 물이나 계란을 섞어서 판 형태를 비롯한 다양한 모양으로
              만든 뒤 끓이거나 구워서 먹는 음식이다.
            </span>
          </Info>
          <Btn type="button" onClick={onEuClick}>
            더보기
          </Btn>
        </CBox>
      </CBoxContainer>
      {mainPosts[0] && mainPosts.map((v: PostsProps) => <RowCards posts={v} key={v.id} />)}
      <HeaderBtn type="button" onClick={onFeedClick}>
        피드 더보기
      </HeaderBtn>
    </AuthLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.cookie = '';
  if (req && cookie) {
    axios.defaults.headers.common.cookie = cookie;
  }
  store.dispatch(loadPostsRequest(null));
  store.dispatch(loadMyInfoRequest());

  store.dispatch(END);

  await (store as SagaStore).sagaTask?.toPromise();

  return {
    props: {},
  };
});

export default Home;
