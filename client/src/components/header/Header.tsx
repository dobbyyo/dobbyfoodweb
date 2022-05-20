import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBowlFood, faPaintbrush, faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { useForm } from 'react-hook-form';

import { RootState } from '../../reducers';
import { logoutRequest } from '../../reducers/user/user';

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  justify-content: space-evenly;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  position: sticky;
  line-height: 25.6px;
  .logo {
    margin: 0 10px;
    cursor: pointer;
    font-size: 25px;
  }
`;
// 왼쪽
const LeftMenu = styled.div`
  display: flex;
  width: 33%;
`;
const MenuContainer = styled.div`
  display: flex;
  margin-left: 20px;
`;

const Menu = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

// 가운데
const Form = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
  form {
    background-color: rgba(224, 224, 224);
  }
  input {
    height: 30px;

    border-radius: 10px;
  }
  .formLogo {
    color: rgb(178, 178, 178);
    margin: 0 10px;
    cursor: pointer;
  }
`;

// 오른쪽
const RightMenu = styled.div`
  display: flex;
  width: 33%;
  justify-content: end;
  .pos {
    position: relative;
  }
`;
const SmallBox = styled.div`
  width: 15px;
  height: 15px;
  background-color: yellowgreen;
  border: 1px solid #000;
  z-index: 999;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  const { register, handleSubmit, getValues, reset } = useForm();
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onHome = useCallback(() => {
    Router.push('/');
  }, []);
  const onLogin = useCallback(() => {
    Router.push('/login');
  }, []);
  const onJoin = useCallback(() => {
    Router.push('/join');
  }, []);
  const onMyPage = useCallback(() => {
    Router.push('/account/edit');
  }, []);
  const onPost = useCallback(() => {
    Router.push('/upload');
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  const onSubmit = useCallback(() => {
    const { search, option } = getValues();
    if (option === '이름') {
      if (search.length === 0 || search.trim().length === 0) {
        alert('검색어를 입력해주세요');
      }
      Router.push(`/title/${search}`);
    } else {
      Router.push(`/hashtag/${search}`);
    }
  }, [getValues]);
  const onRemove = useCallback(() => {
    reset();
  }, []);

  return (
    <HeaderContainer>
      <LeftMenu>
        <FontAwesomeIcon icon={faBowlFood} className="logo" style={{ color: 'green' }} onClick={onHome} />
        <span>Mountain</span>
        <MenuContainer>
          <Menu>피드</Menu>
          <Menu>한식</Menu>
          <Menu>일식</Menu>
          <Menu>양식</Menu>
          <Menu>중식</Menu>
        </MenuContainer>
      </LeftMenu>
      <Form>
        <form>
          <FontAwesomeIcon icon={faSearch} className="formLogo" />
          <input placeholder="검색" />
          <FontAwesomeIcon icon={faX} className="formLogo" />
        </form>
      </Form>
      <RightMenu>
        {me ? (
          <>
            <Menu onClick={onMyPage}>마이페이지</Menu>
            <Menu onClick={onPost}>업로드</Menu>
            <Menu onClick={onLogout}>로그아웃</Menu>
          </>
        ) : (
          <>
            <Menu onClick={onLogin}>로그인</Menu>
            <Menu onClick={onJoin}>회원가입</Menu>
          </>
        )}
        <div className="pos">
          <FontAwesomeIcon icon={faBagShopping} className="logo" />
          <SmallBox>1</SmallBox>
        </div>
        <FontAwesomeIcon icon={faPaintbrush} className="logo" />
      </RightMenu>
    </HeaderContainer>
  );
};

export default Header;