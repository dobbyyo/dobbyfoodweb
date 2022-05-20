import React, { FC } from 'react';
import styled from 'styled-components';
import { BaseBox } from '../shared/shared';

const Container = styled(BaseBox)`
  padding-top: 100px;
  width: 500px;
  form {
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    label {
      width: 100%;
      margin-bottom: 12px;
    }
  }
`;

const FormBox: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default FormBox;
