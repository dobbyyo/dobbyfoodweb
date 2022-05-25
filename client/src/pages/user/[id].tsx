/* eslint-disable no-nested-ternary */
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

import { RootState } from '../../reducers';
import {
  loadMyInfoRequest,
  loadOtherUserInfoRequest,
  loadUserFollowingsRequest,
  loadUserUnFollowersRequest,
} from '../../reducers/user/user';
import wrapper, { SagaStore } from '../../store/configureStore';
import EditUser from '../../layout/EditUserMail';
import MyInfo from '../../layout/MyInfo';
import EditPassword from '../../layout/EditPassword';
import DeleteUser from '../../layout/DeleteUser';
import { loadOtherUserPostsRequest, loadSavePostsRequest } from '../../reducers/post/post';
import Menu from '../../layout/Menu';
import RowCards from '../../components/auth/RowCards';
import { PostsProps } from '../../reducers/post/postType';

const Main = styled.div`
  width: 100%;
  font-size: 20px;
  padding: 0 90px;
  margin-top: 50px;
  display: flex;
  @media (min-width: 768px) and (max-width: 991px) {
  }
  @media (max-width: 767px) {
    padding: 0 10px;
  }
`;

const Middle = styled.div`
  /* width: 70%; */
  position: relative;
  .line {
    /* border-top: 1px solid #000; */
    /* border-bottom: 1px solid #000; */
    /* padding: 20px 0; */
  }
  h1 {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .barIcon {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 100%;
    .line {
      padding: 29px 40px;
    }
    .barIcon {
      display: block;
      position: absolute;
      left: 0;
      top: 30px;
    }
  }
  @media (max-width: 767px) {
    width: 100%;
    font-size: 13px;
    .line {
      padding: 23px 40px;
      h1 {
        font-size: 13px;
      }
    }
    .barIcon {
      display: block;
      position: absolute;
      left: 0;
      top: 23px;
    }
  }
`;

const Container = styled.div`
  width: 100%;
`;

const MBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #000;
  padding: 40px 0;
  margin-top: 30px;
`;
const SMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) and (max-width: 991px) {
  }
  @media (max-width: 767px) {
    h1 {
      font-size: 13px;
    }
  }
`;
const Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SH1 = styled.h1<{ follow: boolean }>`
  color: ${(props) => (props.follow ? 'red' : 'black')};
`;

const User = () => {
  const { userInfo, userChangeDone, followDone, unFollowDone } = useSelector((state: RootState) => state.user);
  const { mainPosts, morePosts, savedPosts, loadOtherUserPostsLoading } = useSelector((state: RootState) => state.post);
  const [ref, inView] = useInView();

  // const id = useSelector((state: RootState) => state.user.me?.id);

  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

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
  const [editUser, setEditUser] = useState(false);
  const [Password, setPassword] = useState(false);
  const [Delete, setDelete] = useState(false);

  const onEditUser = useCallback(() => {
    setEditUser(true);
    setMyInfo(false);
    setPassword(false);
    setDelete(false);
  }, []);
  const onMyInfo = useCallback(() => {
    setMyInfo(true);
    setEditUser(false);
    setPassword(false);
    setDelete(false);
  }, []);
  const onPassword = useCallback(() => {
    setPassword(true);
    setMyInfo(false);
    setEditUser(false);
    setDelete(false);
  }, []);
  const onDelete = useCallback(() => {
    setPassword(false);
    setMyInfo(false);
    setEditUser(false);
    setDelete(true);
  }, []);

  const onCloseEditUser = useCallback(() => {
    setMyInfo(true);
    setEditUser(false);
    setPassword(false);
    setDelete(false);
  }, []);

  const [followersBar, setFollowersBar] = useState(false);
  const [followingsBar, setFollowingsBar] = useState(false);
  const [postsBar, setPostsBar] = useState(true);
  const [savedPostsBar, setSavedPostsBar] = useState(false);

  const onFollowers = useCallback(() => {
    setFollowersBar(true);
    setFollowingsBar(false);
    setPostsBar(false);
    setSavedPostsBar(false);
  }, [setFollowersBar, setFollowingsBar, setPostsBar, setSavedPostsBar]);
  const onFollowings = useCallback(() => {
    setFollowingsBar(true);
    setFollowersBar(false);
    setPostsBar(false);
    setSavedPostsBar(false);
  }, [setFollowingsBar, setFollowersBar, setPostsBar, setSavedPostsBar]);
  const onPosts = useCallback(() => {
    setPostsBar(true);
    setFollowersBar(false);
    setFollowingsBar(false);
    setSavedPostsBar(false);
  }, [setPostsBar, setFollowersBar, setFollowingsBar, setSavedPostsBar]);
  const onSavePosts = useCallback(() => {
    setSavedPostsBar(true);
    setPostsBar(false);
    setFollowersBar(false);
    setFollowingsBar(false);
  }, [setPostsBar, setFollowersBar, setFollowingsBar, setSavedPostsBar]);

  const followBar = followersBar || followingsBar;

  useEffect(() => {
    if (followDone || unFollowDone) {
      dispatch(loadOtherUserInfoRequest(userInfo.id));
    }
  }, [followDone, unFollowDone]);

  // useEffect(() => {
  //   dispatch(loadOtherUserPostsRequest(userInfo.id));
  // }, []);

  useEffect(() => {
    if (inView && morePosts && !loadOtherUserPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadOtherUserPostsRequest(userInfo.id, lastId));
    }
  }, [inView, morePosts, loadOtherUserPostsLoading]);

  console.log(inView, morePosts, !loadOtherUserPostsLoading);

  return (
    <Main>
      {/* <Menu
        userInfo={userInfo}
        onEditUser={onEditUser}
        onMyInfo={onMyInfo}
        onPassword={onPassword}
        onDelete={onDelete}
      />
      <Middle>
        <FontAwesomeIcon icon={faBars} className="barIcon" />
        {editUser && <EditUser onCloseEditUser={onCloseEditUser} />}
        {Password && <EditPassword onCloseEditUser={onCloseEditUser} />}
        {Delete && <DeleteUser />}
      </Middle> */}
      {myInfo && (
        <Container>
          <div className="line">
            <h1>활동 정보</h1>
          </div>
          <MBox>
            <SMenu>
              <SH1 follow={postsBar} onClick={onPosts}>
                포스터
              </SH1>
            </SMenu>
            <SMenu>
              <SH1 follow={savedPostsBar} onClick={onSavePosts}>
                북마크
              </SH1>
            </SMenu>
            <SMenu>
              <SH1 follow={followersBar} onClick={onFollowers}>
                팔로워
              </SH1>
              <h1>{userInfo.Followers}</h1>
            </SMenu>
            <SMenu>
              <SH1 follow={followingsBar} onClick={onFollowings}>
                팔로잉
              </SH1>
              <h1>{userInfo.Followings}</h1>
            </SMenu>
          </MBox>
          <Post>
            {!followBar
              ? savedPostsBar
                ? savedPosts.map((v: PostsProps) => <RowCards posts={v} key={v.id} />)
                : mainPosts.map((v: PostsProps) => <RowCards posts={v} key={v.id} />)
              : null}
            <div ref={morePosts && !loadOtherUserPostsLoading ? ref : undefined} style={{ margin: '30px' }} />
          </Post>
        </Container>
      )}
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }: any) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.cookie = '';
  if (req && cookie) {
    axios.defaults.headers.common.cookie = cookie;
  }
  store.dispatch(loadMyInfoRequest());
  store.dispatch(loadSavePostsRequest(params.id));
  store.dispatch(loadOtherUserPostsRequest(params.id));
  store.dispatch(loadOtherUserInfoRequest(params.id));
  store.dispatch(loadUserFollowingsRequest(params.id));
  store.dispatch(loadUserUnFollowersRequest(params.id));

  store.dispatch(END);

  await (store as SagaStore).sagaTask?.toPromise();

  return {
    props: {},
  };
});

export default User;
