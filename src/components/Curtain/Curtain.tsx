import React from 'react';

import { CurtainWrapper } from './styles';

type Props = {
  title: string;
  children?: React.ReactNode,
  message?: string;
}

const Curtain = ({ children, title, message }: Props) => {
  return (
    <CurtainWrapper>
      <h1>
        {title}
      </h1>
      {message && <p>{message}</p>}
      {children}
    </CurtainWrapper>
  );
};

export default Curtain;