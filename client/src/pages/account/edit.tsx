/* eslint-disable no-nested-ternary */
import axios from 'axios';
import Router from 'next/router';
import gravatar from 'gravatar';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import styled from 'styled-components';

import { RootState } from '../../reducers';
import { loadMyInfoRequest } from '../../reducers/user/user';
import wrapper, { SagaStore } from '../../store/configureStore';
import MyInfo from '../../layout/MyInfo';
import EditUser from '../../layout/editUser';
import EditPassword from '../../layout/EditPassword';
import DeleteUser from '../../layout/DeleteUser';

const Main = styled.div`
  width: 100%;
  font-size: 20px;
  padding: 0 90px;
  margin-top: 50px;
  display: flex;
`;
const Menu = styled.div`
  width: 30%;
`;

const NicknameDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  .AvatarIcon {
    display: flex;
    align-items: center;
    h1 {
      margin-left: 15px;
      font-weight: 800;
      margin-right: 20px;
    }
  }
`;
const Btn = styled.button`
  background-color: initial;
  border: 1px solid #000;
  height: 30px;
  width: 80px;
  cursor: pointer;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 19px;
`;

const Ul = styled.div`
  margin-bottom: 50px;
  margin-top: 30px;
`;
const Title = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
`;
const Li = styled.div`
  margin: 20px 0;
  font-weight: 600;
  cursor: pointer;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Middle = styled.div`
  width: 100%;
  .line {
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    padding: 20px 0;
  }
  h1 {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 10px;
  }
`;
const Edit = () => {
  const { me, userChangeDone } = useSelector((state: RootState) => state.user);
  const id = useSelector((state: RootState) => state.user.me?.id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) {
      Router.push('/');
    }
  }, []);

  useEffect(() => {
    if (userChangeDone) {
      dispatch(loadMyInfoRequest());
    }
  }, [userChangeDone]);

  const [myInfo, setMyInfo] = useState(true);
  const [User, setUser] = useState(false);
  const [Password, setPassword] = useState(false);
  const [Delete, setDelete] = useState(false);

  const onEditUser = useCallback(() => {
    setUser(true);
    setMyInfo(false);
    setPassword(false);
    setDelete(false);
  }, []);
  const onMyInfo = useCallback(() => {
    setMyInfo(true);
    setUser(false);
    setPassword(false);
    setDelete(false);
  }, []);
  const onPassword = useCallback(() => {
    setPassword(true);
    setMyInfo(false);
    setUser(false);
    setDelete(false);
  }, []);
  const onDelete = useCallback(() => {
    setPassword(false);
    setMyInfo(false);
    setUser(false);
    setDelete(true);
  }, []);

  const onCloseEditUser = useCallback(() => {
    setMyInfo(true);
    setUser(false);
    setPassword(false);
    setDelete(false);
  }, []);

  return (
    <Main>
      <Menu>
        <NicknameDiv>
          <div className="AvatarIcon">
            {me ? (
              me.Image ? (
                <Img src={`http://localhost:3100/${me.Image.src}`} alt="img" />
              ) : (
                <Img src={gravatar.url(me.email, { s: '100%', d: 'retro' })} alt="img" />
              )
            ) : null}
            <h1>{me && me.nickname} 님</h1>
          </div>
          <Btn type="button" onClick={onEditUser}>
            수정하기
          </Btn>
        </NicknameDiv>
        <Box>
          <Ul>
            <Title>나의 활동</Title>
            <Li onClick={onMyInfo}>찜</Li>
            <Li>좋아요</Li>
            <Li>팔로워</Li>
            <Li>팔로잉</Li>
          </Ul>
          <Ul>
            <Title>회원정보</Title>
            <Li onClick={onEditUser}>이메일 변경</Li>
            <Li onClick={onPassword}>비밀번호 변경</Li>
            <Li onClick={onDelete}>회원탈퇴</Li>
          </Ul>
        </Box>

        <Btn type="button">로그아웃</Btn>
      </Menu>
      <Middle>
        {myInfo && <MyInfo />}
        {User && <EditUser onCloseEditUser={onCloseEditUser} />}
        {Password && <EditPassword onCloseEditUser={onCloseEditUser} />}
        {Delete && <DeleteUser />}
      </Middle>
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.cookie = '';
  if (req && cookie) {
    axios.defaults.headers.common.cookie = cookie;
  }
  store.dispatch(loadMyInfoRequest());
  store.dispatch(END);

  await (store as SagaStore).sagaTask?.toPromise();

  return {
    props: {},
  };
});

export default Edit;
