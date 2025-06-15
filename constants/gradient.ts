import { ColorValue } from 'react-native';

type GradientColors = readonly [ColorValue, ColorValue, ...ColorValue[]];

const GRADIENTS = {
  primary: ['#FAF9FD', '#F4F1FB'] as GradientColors,
  secondary: ['#FDF9FD', '#F9F1F9'] as GradientColors,
  neutral: ['#FEFCFA', '#F7F3EF'] as GradientColors,
};

export { GRADIENTS };
