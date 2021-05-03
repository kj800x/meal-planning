import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './src/app.json';
import { MealsScreen } from './src/screens/meals/MealsScreen';
import { ShoppingScreen } from './src/screens/shopping';
import { SettingsScreen } from './src/screens/settings/SettingsScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faList, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';

const BottomTabs = createMaterialBottomTabNavigator();
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://10.60.1.3/meals/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <BottomTabs.Navigator initialRouteName="Meals">
          <BottomTabs.Screen
            name="Meals"
            component={MealsScreen}
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
