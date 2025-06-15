import { memo } from 'react';
import { Text, View } from 'react-native';

type CalendarLegendProps = {
  className?: string;
};

const CalendarLegend = memo(({ className }: CalendarLegendProps) => {
  return (
    <View className={`flex-row flex-wrap justify-center ${className}`}>
      <View className={'flex-row items-center gap-1'}>
        <View className={'h-3 w-3 rounded-full bg-health-cycle/60'} />
        <Text className={'text-xs text-gray-600'}>月经期</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <View className={'h-3 w-3 rounded-full bg-health-fertile/60'} />
        <Text className={'text-xs text-gray-600'}>易孕期</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <View className={'h-3 w-3 rounded-full bg-primary-300'} />
        <Text className={'text-xs text-gray-600'}>排卵日</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <View className={'h-3 w-3 rounded-full bg-secondary-200'} />
        <Text className={'text-xs text-gray-600'}>有记录</Text>
      </View>
    </View>
  );
});

CalendarLegend.displayName = 'CalendarLegend';

export { CalendarLegend };
