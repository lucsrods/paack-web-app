import styled from 'styled-components';

export const List = styled.ul`
  padding: 1rem;
  margin: 0 auto;
  list-style: none;
  max-width: 900px;
`;

export const Item = styled.li<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  background: ${({ active }) => active ? '#ddd' : '#fff'};

  &:last-child {
    border-bottom: 1px solid #ccc;
  }

  &:hover {
    background: #ccc;
  }
`;