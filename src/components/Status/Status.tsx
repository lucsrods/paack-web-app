import React from 'react';

import { StyledStatus } from './styles';

type Props = {
  isActive: boolean | null;
  status: string | null | undefined;
}

const Status = ({ status, isActive }: Props) => {
  const getStatus = () => {
    return String(isActive ? 'active' : status);
  };

  return (
    <StyledStatus className={getStatus()}>{getStatus()?.toUpperCase() ?? 'IDLE'}</StyledStatus>
  );
};

export default Status;