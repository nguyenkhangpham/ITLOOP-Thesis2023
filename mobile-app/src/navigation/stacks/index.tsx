import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { SCREEN_NAME } from './RouteName';
import BottomTabBar from '../BottomTabBar';
import { Platform } from 'react-native';
import SplashScreen from '../../features/splash';
import LoginScreen from '../../features/login';
import HistoryDetailScreen from '../../features/historyDetail';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyleInterpolator: Platform.select({
    android: CardStyleInterpolators.forFadeFromBottomAndroid,
    ios: CardStyleInterpolators.forHorizontalIOS,
  }),
};

export const UnAuthenticationStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name={SCREEN_NAME.Splash} component={SplashScreen} />
    <Stack.Screen name={SCREEN_NAME.Login} component={LoginScreen} />
  </Stack.Navigator>
);

export const AuthenticationStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name={SCREEN_NAME.BottomTab} component={BottomTabBar} />
    <Stack.Screen
      name={SCREEN_NAME.HistoryDetail}
      component={HistoryDetailScreen}
    />
  </Stack.Navigator>
);
