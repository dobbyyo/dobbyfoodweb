import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBowlFood, faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { useForm } from 'react-hook-form';

import { RootState } from '../../reducers';
import { logoutRequest } from '../../reducers/user/user';
import Search from './Search';
import SlideBox from './SliderBox';

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
  top: 0;
  z-index: 999;
  background-color: #fff;
  line-height: 25.6px;
  .logo {
    margin: 0 10px;
    cursor: pointer;
    font-size: 25px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    justify-content: space-between;
  }
  @media (max-width: 767px) {
    justify-content: space-between;
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
  @media (min-width: 768px) and (max-width: 991px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const Menu = styled.div`
  margin-right: 10px;
  cursor: pointer;
  @media (min-width: 768px) and (max-width: 991px) {
  }
  @media (max-width: 767px) {
    display: none;
  }
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
  @media (min-width: 768px) and (max-width: 991px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

// 오른쪽
const RightMenu = styled.div`
  display: flex;
  width: 33%;
  justify-content: end;
  .searchLogo {
    display: none;
  }
  .pos {
    position: relative;
  }
  .barLogo {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    align-items: center;
    .searchLogo {
      margin-right: 10px;
      display: flex;
    }
    .barLogo {
      display: none;
    }
  }
  @media (max-width: 767px) {
    width: 70%;
    align-items: center;
    .searchLogo {
      display: flex;
    }
    .barLogo {
      display: flex;
      margin: 0 10px;
    }
  }
`;

const InputOption = styled.select`
  border: none;
  padding-right: 1rem;
  background-color: initial;
  cursor: pointer;
  height: 100%;
`;

const Header = () => {
  const { register, handleSubmit, getValues, reset } = useForm();
  const { me } = useSelector((state: RootState) => state.user);
  const id = useSelector((state: RootState) => state.user.me?.id);

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
    Router.push(`/user/${id}`);
  }, []);
  const onPost = useCallback(() => {
    Router.push('/upload');
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logoutRequest());
    Router.push('/');
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
  const onFeed = useCallback(() => {
    Router.push('/feed');
  }, []);

  const [bar, setBar] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  const onSearchBar = useCallback(() => {
    setSearchBar((pre) => !pre);
  }, [setSearchBar]);
  const onCloseSearchBar = useCallback(() => {
    setSearchBar(false);
  }, [setSearchBar]);
  const onCloseBar = useCallback(() => {
    setBar(false);
  }, []);
  const onBar = useCallback(() => {
    setBar((prv) => !prv);
  }, []);

  return (
    <>
      <HeaderContainer>
        <LeftMenu>
          <FontAwesomeIcon icon={faBowlFood} className="logo" style={{ color: 'green' }} onClick={onHome} />
          <span>Mountain</span>
          <MenuContainer>
            <Menu onClick={onFeed}>피드</Menu>
            <Menu>한식</Menu>
            <Menu>일식</Menu>
            <Menu>양식</Menu>
            <Menu>중식</Menu>
          </MenuContainer>
        </LeftMenu>
        <Form>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FontAwesomeIcon icon={faSearch} className="formLogo" />
            <input placeholder="검색" {...register('search')} />
            <InputOption id="option" {...register('option')}>
              <option value="이름">이름</option>
              <option value="해시태그">해시태그</option>
            </InputOption>
            <FontAwesomeIcon icon={faX} className="formLogo" onClick={onRemove} />
          </form>
        </Form>
        <RightMenu>
          <FontAwesomeIcon icon={faSearch} className="searchLogo" onClick={onSearchBar} />
          <FontAwesomeIcon icon={faBars} className="barLogo" onClick={onBar} />

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
        </RightMenu>
      </HeaderContainer>
      {bar ? <SlideBox onCloseBar={onCloseBar} /> : null}
      {searchBar ? <Search onCloseSearchBar={onCloseSearchBar} /> : null}
    </>
  );
};

export default Header;
