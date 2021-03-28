import styled from "styled-components";

export const Grid = styled.div`
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
`;

export const ColumnHeader = styled.div`
  font-weight: 600;
  text-align: center;
`;
