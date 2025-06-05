import { LinearGradient } from 'expo-linear-gradient';
import { memo, ReactNode, useMemo } from 'react';
import { GRADIENTS } from '@/lib/gradient';
import { StyleProp, ViewStyle } from 'react-native';

type GradientType = 'primary' | 'secondary' | 'neutral';

interface GradientBackgroundProps {
  type?: GradientType;
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * 渐变背景容器组件，用于包裹子元素并应用预定义的线性渐变效果
 *
 * @param props - 组件属性对象
 * @param props.type - 可选的渐变类型，可选值为 `primary` | `secondary` | `neutral`，默认为 `primary`
 * @param props.className - 可选的附加类名，用于自定义样式
 * @param props.children - 需要被渐变背景包裹的React子元素
 * @returns {LinearGradient} - 线性渐变背景容器组件
 */
const GradientBackground = memo(
  ({
    type = 'primary',
    children,
    className,
    style,
  }: GradientBackgroundProps) => {
    const gradientColors = useMemo(
      () => GRADIENTS[type] ?? GRADIENTS.primary,
      [type],
    );

    return (
      <LinearGradient
        colors={gradientColors}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={style}
        className={className}
      >
        {children}
      </LinearGradient>
    );
  },
);

GradientBackground.displayName = 'GradientBackground';

export { GradientBackground };
