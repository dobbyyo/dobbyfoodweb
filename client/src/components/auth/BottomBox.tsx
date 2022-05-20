import Link from 'next/link';
import React, { FC } from 'react';
import styled from 'styled-components';

import { BaseBox } from '../shared/shared';

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  /* width: 100%; */
  /* background-color: red; */
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.blue};
  }
`;

interface IProps {
  cta: string;
  link: string;
  linkText: string;
}

const BottomBox: FC<IProps> = ({ cta, link, linkText }) => {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link href={link}>
        <a>{linkText}</a>
      </Link>
    </SBottomBox>
  );
};

export default BottomBox;
