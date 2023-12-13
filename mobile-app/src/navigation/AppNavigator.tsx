import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useCallback, useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SCREEN_STACK } from './stacks/RouteName';
import { AuthenticationStack, UnAuthenticationStack } from './stacks';

const MainStack = createStackNavigator();

const AppNavigator = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const routeNameRef = useRef<string | undefined>('');

  const onNavigationReady = useCallback(() => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  }, []);

  const onNavigationStateChange = useCallback(async () => {
    const previousRouteName = routeNameRef.current;

    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      // The line below uses the expo-firebase-analytics tracker
      // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
      // Change this line to use another Mobile analytics SDK
      // logScreenView({
      //   screen_name: currentRouteName ?? '',
      //   screen_class: currentRouteName ?? '',
      // });
    }

    if (__DEV__) {
      console.group(
        '%cSCREEN CHANGE',
        'color:white;font-weight:bold;background:orange;padding:2px 6px',
        currentRouteName,
      );

      console.log('Previous Screen\t\t', previousRouteName);
      console.log('Current Screen\t\t', currentRouteName);

      console.groupEnd();
    }

    routeNameRef.current = currentRouteName;
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'white'}
      />
      <NavigationContainer
        ref={navigationRef}
        onReady={onNavigationReady}
        onStateChange={onNavigationStateChange}>
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: Platform.select({
              android: CardStyleInterpolators.forFadeFromBottomAndroid,
              ios: CardStyleInterpolators.forHorizontalIOS,
            }),
          }}>
          <MainStack.Screen
            name={SCREEN_STACK.UnAuthentication}
            component={UnAuthenticationStack}
          />
          <MainStack.Screen
            name={SCREEN_STACK.Authentication}
            component={AuthenticationStack}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
