import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import styled from 'styled-components';
import AuthLayout from '../../components/auth/AuthLayout';
import RowCards from '../../components/auth/RowCards';

import { RootState } from '../../reducers';
import { loadCategoryPostsRequest } from '../../reducers/post/post';
import { PostsProps } from '../../reducers/post/postType';
import { loadMyInfoRequest } from '../../reducers/user/user';
import wrapper, { SagaStore } from '../../store/configureStore';

const Box = styled.div`
  font-size: 30px;
  display: flex;
  width: 30%;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
  @media (min-width: 768px) and (max-width: 991px) {
    width: 50%;
  }
  @media (max-width: 767px) {
    width: 80%;
    font-size: 12px;
  }
`;

const CategoryName = styled.div<{ run: boolean }>`
  color: ${(props) => (props.run ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)')};
  border-bottom: ${(props) => (props.run ? '1px solid red' : ' 1px solid rgba(0,0,0,0.3)')};
  cursor: pointer;
`;

const Category = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const { categoryPosts, morePosts, loadCategoryPostsLoading } = useSelector((state: RootState) => state.post);

  const router = useRouter();
  const { category } = router.query;
  console.log(category);
  const [korea, setKorea] = useState(true);
  const [japan, setJapan] = useState(false);
  const [china, setChina] = useState(false);
  const [eu, setEu] = useState(false);

  const onKorea = useCallback(() => {
    setKorea(true);
    setJapan(false);
    setChina(false);
    setEu(false);
    Router.push('/category/한식');
  }, []);

  const onJapan = useCallback(() => {
    setJapan(true);
    setKorea(false);
    setChina(false);
    setEu(false);
    Router.push('/category/일식');
  }, []);
  const onChina = useCallback(() => {
    setChina(true);
    setJapan(false);
    setKorea(false);
    setEu(false);
    Router.push('/category/중식');
  }, []);
  const onEu = useCallback(() => {
    setEu(true);
    setJapan(false);
    setKorea(false);
    setChina(false);
    Router.push('/category/양식');
  }, []);

  useEffect(() => {
    if (inView && morePosts && !loadCategoryPostsLoading) {
      const lastId = categoryPosts[categoryPosts.length - 1]?.id;
      const data = { category, lastId };
      dispatch(loadCategoryPostsRequest(data));
    }
  }, [inView, morePosts, loadCategoryPostsLoading]);

  return (
    <AuthLayout>
      <Box>
        <CategoryName run={korea} onClick={onKorea}>
          한식
        </CategoryName>
        <CategoryName run={japan} onClick={onJapan}>
          일식
        </CategoryName>
        <CategoryName run={china} onClick={onChina}>
          중식
        </CategoryName>
        <CategoryName run={eu} onClick={onEu}>
          양식
        </CategoryName>
      </Box>
      {categoryPosts[0] && categoryPosts.map((v: PostsProps) => <RowCards posts={v} key={v.id} />)}
      <div ref={morePosts && !loadCategoryPostsLoading ? ref : undefined} style={{ margin: '30px' }} />
    </AuthLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }: any) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.cookie = '';
  if (req && cookie) {
    axios.defaults.headers.common.cookie = cookie;
  }
  store.dispatch(loadCategoryPostsRequest({ category: params.category }));
  store.dispatch(loadMyInfoRequest());

  store.dispatch(END);

  await (store as SagaStore).sagaTask?.toPromise();

  return {
    props: {},
  };
});

export default Category;
