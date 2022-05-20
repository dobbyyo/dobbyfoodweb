import React from 'react';
import styled from 'styled-components';

const MBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border-top: 1px solid #000; */
  border-bottom: 1px solid #000;
  padding: 40px 0;
  margin-top: 30px;
`;
const SMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MyInfo = () => {
  return (
    <div>
      <div className="line">
        <h1>나의 활동 정보</h1>
      </div>
      <MBox>
        <SMenu>
          <h1>포스터</h1>
          <h1>0</h1>
        </SMenu>
        <SMenu>
          <h1>팔로워</h1>
          <h1>0</h1>
        </SMenu>
        <SMenu>
          <h1>팔로잉</h1>
          <h1>0</h1>
        </SMenu>
        <SMenu>
          <h1>좋아요</h1>
          <h1>0</h1>
        </SMenu>
        <SMenu>
          <h1>북마크</h1>
          <h1>0</h1>
        </SMenu>
      </MBox>
    </div>
  );
};

export default MyInfo;
