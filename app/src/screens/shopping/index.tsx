import React from 'react';
import { PlanningScreen } from './PlanningScreen';
import { ShoppingScreen as ShoppingSquaredScreen } from './ShoppingScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DateHeader } from '../../library/DateHeader';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
`;
const TopTabs = createMaterialTopTabNavigator();

export const ShoppingScreen = () => {
  return (
    <Wrapper>
      <DateHeader start={1000 * 60 * 60 * 24 * 2} end={1000 * 60 * 60 * 24 * 7} onReselect={() => {}} />
      <NavigationContainer independent={true}>
        <TopTabs.Navigator>
          <TopTabs.Screen name="Planning" component={PlanningScreen} />
          <TopTabs.Screen name="Shopping" component={ShoppingSquaredScreen} />
        </TopTabs.Navigator>
      </NavigationContainer>
    </Wrapper>
  );
};
