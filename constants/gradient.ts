import { ColorValue } from 'react-native';

type GradientColors = readonly [ColorValue, ColorValue, ...ColorValue[]];

const GRADIENTS = {
  primary: ['#F4F1FB', '#D4C7F0'] as GradientColors,
  secondary: ['#F9F1F9', '#E8D5E8'] as GradientColors,
  neutral: ['#F7F3EF', '#E6DDD4'] as GradientColors,
  menstrual: ['#FCE4EC', '#F48FB1'] as GradientColors, // 月经期
  follicular: ['#E3F2FD', '#90CAF9'] as GradientColors, // 卵泡期
  ovulation: ['#E8F5E9', '#A5D6A7'] as GradientColors, // 排卵期
  luteal: ['#FFFDE7', '#FFF59D'] as GradientColors, // 黄体期
} as const;

export { GRADIENTS };
