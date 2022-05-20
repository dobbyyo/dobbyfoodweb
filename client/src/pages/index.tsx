import React from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import { END } from 'redux-saga';

import wrapper, { SagaStore } from '../store/configureStore';
import { loadMyInfoRequest } from '../reducers/user/user';

const Home: NextPage = () => {
  return <div style={{ fontWeight: '700', fontSize: '50px' }}>asd</div>;
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

export default Home;
