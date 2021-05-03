import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Loading: FC = () => {
  return (
    <Wrapper>
      <ActivityIndicator />
    </Wrapper>
  );
};
