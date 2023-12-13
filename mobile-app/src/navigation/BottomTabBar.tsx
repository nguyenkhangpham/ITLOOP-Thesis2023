import React from 'react';
import { BOTTOM_TABS } from './stacks/RouteName';
import {
  Home as HomeIcon,
  UserCircle as AccountIcon,
  Pill,
} from '@tamagui/lucide-icons';

import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';

import HomeScreen from '../features/home';
import AccountScreen from '../features/account';
import HistoryScreen from '../features/history';
import { Text } from 'tamagui';

const { Home, History, Account } = BOTTOM_TABS;

const Tabs = AnimatedTabBarNavigator();

const BottomTabBar = () => {
  return (
    <Tabs.Navigator
      appearance={{
        shadow: true,
        activeTabBackgrounds: '#D7F1EE',
      }}
      screenOptions={({ route }) => ({
        headerShown: false,

        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused }: { focused: boolean }) => {
          const options = {
            color: focused ? '#24736E' : '#333',
            size: 22,
          };

          switch (route.name) {
            case Home:
              return <HomeIcon {...options} />;
            case History:
              return <Pill {...options} />;
            case Account:
              return <AccountIcon {...options} />;
          }
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarLabel: ({ focused }: { focused: boolean }) => {
          return (
            <Text
              color={focused ? '#24736E' : '#333'}
              fontWeight={focused ? 'bold' : 'normal'}
              ml={'$2'}
              children={route.name}
            />
          );
        },
      })}
      initialRouteName={Home}>
      <Tabs.Screen key={Home} name={Home} component={HomeScreen} />
      <Tabs.Screen key={History} name={History} component={HistoryScreen} />
      <Tabs.Screen key={Account} name={Account} component={AccountScreen} />
    </Tabs.Navigator>
  );
};

export default BottomTabBar;
