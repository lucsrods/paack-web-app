import styled from 'styled-components';

export const StyledStatus = styled.span`
  &.active {
    color: green;
  }

  &.undelivered {
    color: red;
  }

  &.delivered {
    color: #ddd;
  } 
`;