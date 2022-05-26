import React, { FC, useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #e5e5e5;
  margin-top: 20px;
  h1 {
    margin: 30px 20px;
    cursor: pointer;
  }
  @media (min-width: 1200px) {
    position: fixed;
    height: 400px;
    width: 100%;
    z-index: 999;
    background-color: #fff;
    font-size: 22px;
    margin-top: 0;
  }
`;

interface Props {
  onCloseBar: () => void;
}

const Sbox: FC<Props> = ({ onCloseBar }) => {
  const onJapan = useCallback(() => {
    Router.push('/category/일식');
    onCloseBar();
  }, []);
  const onChina = useCallback(() => {
    Router.push('/category/중식');
    onCloseBar();
  }, []);
  const onEurope = useCallback(() => {
    Router.push('/category/양식');
    onCloseBar();
  }, []);
  const onKorea = useCallback(() => {
    Router.push('/category/한식');
    onCloseBar();
  }, []);
  return (
    <Box>
      <h1 onClick={onJapan} aria-hidden="true">
        양식
      </h1>
      <h1 onClick={onChina} aria-hidden="true">
        중식
      </h1>
      <h1 onClick={onEurope} aria-hidden="true">
        일신
      </h1>
      <h1 onClick={onKorea} aria-hidden="true">
        한식
      </h1>
    </Box>
  );
};

export default Sbox;
