import React from 'react';
import { TamaguiProvider } from 'tamagui';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Platform, UIManager } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import AppNavigator from './src/navigation/AppNavigator';

import config from './tamagui.config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const isIos = Platform.OS === 'ios';

if (!isIos) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

if (isIos) {
  KeyboardManager.setEnable(true);

  KeyboardManager.setEnableDebugging(false);

  KeyboardManager.setKeyboardDistanceFromTextField(10);

  KeyboardManager.setLayoutIfNeededOnUpdate(true);

  KeyboardManager.setEnableAutoToolbar(false);

  KeyboardManager.setOverrideKeyboardAppearance(true);

  // "default" | "light" | "dark"
  KeyboardManager.setKeyboardAppearance('default');

  KeyboardManager.setShouldResignOnTouchOutside(true);

  KeyboardManager.setShouldPlayInputClicks(true);

  KeyboardManager.resignFirstResponder();

  KeyboardManager.reloadLayoutIfNeeded();
}

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <TamaguiProvider config={config}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigator />
        </GestureHandlerRootView>
      </TamaguiProvider>
    </ApplicationProvider>
  );
};

export default App;
