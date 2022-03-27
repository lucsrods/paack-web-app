import styled from 'styled-components';

export const DetailsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;

export const ActionsWrapper = styled.div`
  & > *:first-child {
    margin-right: 1rem;
  }
`;