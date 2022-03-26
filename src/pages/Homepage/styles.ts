import styled from 'styled-components';

export const List = styled.ul`
  padding: 1rem;
  margin: 0;
  list-style: none;
`;

export const Item = styled.li`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-bottom: none;

  &:last-child {
    border-bottom: 1px solid #ccc;
  }
`;