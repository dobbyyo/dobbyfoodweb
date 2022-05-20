import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import styled from 'styled-components';
import AuthLayout from '../../components/auth/AuthLayout';
import { RootState } from '../../reducers';
import { loadMyInfoRequest } from '../../reducers/user/user';
import wrapper, { SagaStore } from '../../store/configureStore';

const UserInfo = styled.div`
  background-color: red;
  width: 100%;
  height: 100px;
  color: #fff;
`;

const User = () => {
  const { userInfo, me, followDone, unFollowDone, Followings, Followers } = useSelector(
    (state: RootState) => state.user,
  );
  return (
    <AuthLayout>
      <UserInfo>
        <h1>{me.name}</h1>
      </UserInfo>
    </AuthLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.cookie = '';
  if (req && cookie) {
    axios.defaults.headers.common.cookie = cookie;
  }
  store.dispatch(loadMyInfoRequest());
  // store.dispatch(loadOtherUserInfoRequest(params.id));
  // store.dispatch(loadSavePostsRequest(params.id));
  // store.dispatch(loadOtherUserPostsRequest(params.id));
  // store.dispatch(loadUserFollowingsRequest(params.id));
  // store.dispatch(loadUserUnFollowersRequest(params.id));
  store.dispatch(END);

  await (store as SagaStore).sagaTask?.toPromise();

  return {
    props: {},
  };
});

export default User;
