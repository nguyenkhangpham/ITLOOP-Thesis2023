import { Dimensions } from 'react-native';

const figmaScreenSize = {
  width: 414,
  height: 896,
};

const screenWidth = Dimensions.get('window').width,
  screenHeight = Dimensions.get('window').height;

// FIXME: if sWidth/sHeight is integer number x, native-base treats it as theme.spacing[x] which breaks everything
export const sWidth = (figmaWidth: number): number => {
  const result = (figmaWidth * screenWidth) / figmaScreenSize.width;

  return Number.isInteger(result) ? result + 0.0001 : result;
};

export const sHeight = (figmaHeight: number): number => {
  const result = (figmaHeight * screenHeight) / figmaScreenSize.height;

  return Number.isInteger(result) ? result + 0.0001 : result;
};

export const BOTTOM_BAR_HEIGHT = sHeight(95);
