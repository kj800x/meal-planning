import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './src/app.json';
import { MealsScreen } from './src/screens/meals/MealsScreen';
import { CookbookScreen } from './src/screens/cookbook/CookbookScreen';
import { ShoppingScreen } from './src/screens/shopping';
import { SettingsScreen } from './src/screens/settings/SettingsScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faList, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://meals.coolkev.com/meals/graphql',
  cache: new InMemoryCache(),
});

const MealsStack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

const MealsStackScreen = () => {
  return (
    <MealsStack.Navigator>
      <MealsStack.Screen name="MealsHome" component={MealsScreen} options={{ header: () => null }} />
      <MealsStack.Screen name="Cookbook" component={CookbookScreen} />
    </MealsStack.Navigator>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <BottomTabs.Navigator initialRouteName="Meals">
          <BottomTabs.Screen
            name="Meals"
            component={MealsStackScreen}
            options={{
              title: 'Meals',
              tabBarIcon: ({ color }) => <FontAwesomeIcon color={color} size={24} icon={faUtensils} />,
            }}
          />
          <BottomTabs.Screen
            name="Shopping"
            component={ShoppingScreen}
            options={{
              title: 'Shopping',
              tabBarIcon: ({ color }) => <FontAwesomeIcon color={color} size={24} icon={faList} />,
            }}
          />
          <BottomTabs.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: 'Settings',
              tabBarIcon: ({ color }) => <FontAwesomeIcon color={color} size={24} icon={faCog} />,
            }}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
