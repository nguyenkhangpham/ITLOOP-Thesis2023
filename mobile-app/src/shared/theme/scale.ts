import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 430;

const scale = (size: number) => (width / guidelineBaseWidth) * size;

export const sizeScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
