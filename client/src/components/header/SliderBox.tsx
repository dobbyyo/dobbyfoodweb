import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const Slider = styled.div`
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
  bottom: -80px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  font-size: 30px;
  font-weight: 800;
  padding: 0 20px;
`;

const Rows = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0;
`;
const Row = styled.div`
  margin: 30px 0;
  padding: 10px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const SlideBox = () => {
  const onLogin = useCallback(() => {
    Router.push('/login');
  }, []);
  const onJoin = useCallback(() => {
    Router.push('/join');
  }, []);

  return (
    <Slider>
      <Rows>
        <Row>
          <span>카테고리</span>
          <FontAwesomeIcon icon={faAngleDown} />
        </Row>
        <Row onClick={onLogin}>로그인</Row>
        <Row onClick={onJoin}>회원가입</Row>
        <Row>프로필</Row>
      </Rows>
    </Slider>
  );
};

export default SlideBox;
