import Router from 'next/router';
import React, { FC, useCallback } from 'react';
import gravatar from 'gravatar';

import styled from 'styled-components';
import { PostsProps } from '../../reducers/post/postType';

interface Props {
  posts: PostsProps;
}

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  /* border: 3px solid #000; */
  width: 100%;
  background-color: #597;
`;
const Img = styled.img`
  width: 200px;
  height: 200px;
`;
const SImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 10px;
`;

const Box = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
`;
const Info = styled.div`
  margin-left: 20px;
  .title {
    font-size: 12px;
    margin-bottom: 2px;
  }
`;
const Btn = styled.button`
  width: 30%;
  height: 25px;
  margin-bottom: 20px;
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  cursor: pointer;
`;

const PostCard: FC<Props> = ({ posts }) => {
  const onClick = useCallback(() => {
    // console.log(posts.id);
    Router.push(`/post/${posts.id}}`);
  }, []);

  return (
    <Container>
      {posts.Images[0] && <Img src={`http://localhost:3100/${posts.Images[0].src}`} alt="img" />}
      <Box>
        {/* {posts.User.Image.src ? (
          <SImg src={`http://localhost:3100/${posts.User.Image.src}`} alt="img" />
        ) : (
          <SImg src={gravatar.url(posts.User.email, { s: '100%', d: 'retro' })} alt="img" />
        )} */}
        <Info>
          <h1 className="title">{posts.title}</h1>
          <h1>{posts.content}</h1>
        </Info>
      </Box>
      {/* <Btn type="button" onClick={onClick}>
        더 보기
      </Btn> */}
    </Container>
  );
};

export default PostCard;
