import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config.js';

type AppColors = {
  primary: { DEFAULT: string; [key: string]: string };
  secondary: { DEFAULT: string; [key: string]: string };
  neutral: { DEFAULT: string; [key: string]: string };
  gray: { [key: string]: string };
  success: { DEFAULT: string; light: string; dark: string };
  error: { DEFAULT: string; light: string; dark: string };
  warning: { DEFAULT: string; light: string; dark: string };
  info: { DEFAULT: string; light: string; dark: string };
  health: {
    menstrual: { DEFAULT: string; light: string; dark: string };
    follicular: { DEFAULT: string; light: string; dark: string };
    ovulation: { DEFAULT: string; light: string; dark: string };
    luteal: { DEFAULT: string; light: string; dark: string };
    calm: string;
    energy: string;
  };
};

const fullConfig = resolveConfig(tailwindConfig);
const COLORS = fullConfig.theme?.colors as unknown as AppColors;

export { COLORS };
