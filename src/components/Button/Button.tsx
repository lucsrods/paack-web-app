import React from 'react';

import { StyledButton } from './styles';

type Props = {
  children: string,
  onClick: () => void,
  disabled?: boolean
}

const Button = ({ disabled, children, onClick }: Props) => {
  return (
    <StyledButton type="button" onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;