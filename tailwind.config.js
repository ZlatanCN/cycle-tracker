/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // 1. 主题色系 (Theme Purple)
        themePurple: {
          DEFAULT: '#A998F0', // 一个更实用的主色调，设为默认
          50: '#F5F3FF', // 非常浅
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#CDC1FF', // 你提供的颜色
          400: '#B9A9FC',
          500: '#A998F0', // 主要行动色/强调色
          600: '#8F7EE7',
          700: '#7C66D8', // 可用于文字或深色背景
          800: '#654FC0',
          900: '#533E9E',
          950: '#382A77', // 非常深，接近黑色
        },
        // 2. 温暖中性色系 (Warm Neutral)
        warmNeutral: {
          DEFAULT: '#F5EBDC', // 一个略深一点的米色，设为默认
          50: '#FFFCF5', // 非常浅
          100: '#FFF6E3', // 你提供的颜色 (非常适合做整体背景)
          200: '#F5EBDC',
          300: '#EAE0D1',
          400: '#DBCFC1',
          500: '#C4B6A7', // 可用于次要元素、分割线
          600: '#A69C8F', // 可用于次要文字
          700: '#8A8075',
          800: '#736C62', // 可用于主要文字 (若对比度足够)
          900: '#605A52',
          950: '#3C3732',
        },
        // 3. 通用灰色系 (General Grays)
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6', // 常用作浅背景
          200: '#E5E7EB',
          300: '#D1D5DB', // 边框、分割线
          400: '#9CA3AF', // 次要文字、图标
          500: '#6B7280', // 常规文字
          600: '#4B5563',
          700: '#374151', // 标题、重要文字
          800: '#1F2937',
          900: '#111827', // 深色模式背景
          950: '#030712',
        },
        // 4. 语义化颜色 (Semantic Colors)
        success: {
          DEFAULT: '#10B981', // Green
          light: '#D1FAE5', // 成功提示背景
          dark: '#047857', // 成功提示文字
        },
        error: {
          DEFAULT: '#EF4444', // Red
          light: '#FEE2E2',
          dark: '#B91C1C',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber
          light: '#FEF3C7',
          dark: '#B45309',
        },
        info: {
          // 可以用 themePurple 的某个色阶，或者一个中性的蓝色
          DEFAULT: '#3B82F6', // Blue (通用信息蓝)
          light: '#DBEAFE',
          dark: '#1D4ED8',
        },
      },
    },
  },
  plugins: [],
};
