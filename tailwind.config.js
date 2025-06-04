/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // 1. 主题紫色系 - 调整为更柔和的薰衣草紫
        primary: {
          DEFAULT: '#B8A9DC', // 更柔和的主色调
          50: '#FAF9FD',
          100: '#F4F1FB',
          200: '#E9E3F7',
          300: '#D4C7F0', // 很柔和的浅紫
          400: '#B8A9DC', // 主要色调
          500: '#9D8BC7', // 稍深的紫色
          600: '#8B7AB8', // 适合按钮hover状态
          700: '#7A6BA3', // 适合文字
          800: '#5D4F7A', // 深色文字
          900: '#4A3F61', // 很深的紫色
          950: '#2D2438', // 接近黑色
        },

        // 2. 柔和粉紫色系 - 作为辅助色，更温柔
        secondary: {
          DEFAULT: '#E8D5E8',
          50: '#FDF9FD',
          100: '#F9F1F9',
          200: '#F0E3F0',
          300: '#E8D5E8', // 很温柔的粉紫
          400: '#D4B8D4',
          500: '#C19BC1',
          600: '#A67FA6',
          700: '#8B6B8B',
          800: '#6B526B',
          900: '#4A3A4A',
        },

        // 3. 温暖米色系 - 调整为更高级的色调
        neutral: {
          DEFAULT: '#F7F3EF', // 更纯净的米白色
          50: '#FEFCFA',
          100: '#F7F3EF', // 主要背景色
          200: '#F0EAE4',
          300: '#E6DDD4',
          400: '#D4C7B8', // 分割线、边框
          500: '#B8A898', // 次要元素
          600: '#9A8A7A', // 次要文字
          700: '#7D6F61', // 常规文字
          800: '#5C524A', // 重要文字
          900: '#3D3530', // 深色文字
          950: '#2A221E', // 最深色
        },

        // 4. 高级灰色系 - 稍微调整为更温暖的灰色
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F4', // 温暖的浅灰
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E', // 次要文字
          500: '#78716C', // 常规文字
          600: '#57534E',
          700: '#44403C', // 重要文字
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },

        // 5. 语义化颜色 - 调整为更柔和的版本
        success: {
          DEFAULT: '#22C55E', // 柔和的绿色
          light: '#DCFCE7',
          dark: '#15803D',
        },
        error: {
          DEFAULT: '#F87171', // 柔和的红色
          light: '#FEE2E2',
          dark: '#DC2626',
        },
        warning: {
          DEFAULT: '#FBBF24', // 柔和的黄色
          light: '#FEF3C7',
          dark: '#D97706',
        },
        info: {
          DEFAULT: '#8B5CF6', // 使用主题紫色的变体
          light: '#EDE9FE',
          dark: '#7C3AED',
        },

        // 6. 特殊功能色 - 为健康应用定制
        health: {
          // 月经周期相关
          cycle: '#E879F9', // 柔和的粉紫色
          fertile: '#A7F3D0', // 柔和的绿色
          // 情绪相关
          calm: '#BFDBFE', // 柔和的蓝色
          energy: '#FED7AA', // 柔和的橙色
        },
      },

      // 添加一些渐变色，让界面更有层次
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FAF9FD 0%, #F4F1FB 100%)',
        'gradient-secondary':
          'linear-gradient(135deg, #FDF9FD 0%, #F9F1F9 100%)',
        'gradient-neutral': 'linear-gradient(135deg, #FEFCFA 0%, #F7F3EF 100%)',
      },
    },
  },
  plugins: [],
};
