import { memo } from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type CalendarLegendProps = {
  className?: string;
};

const CalendarLegend = memo(({ className }: CalendarLegendProps) => {
  return (
    <View className={`flex-row flex-wrap justify-center ${className}`}>
      <View className={'flex-row items-center gap-1'}>
        <View className={'h-3 w-3 rounded-full bg-health-follicular'} />
        <Text className={'text-xs text-gray-600'}>卵泡期</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <View className={'h-3 w-3 rounded-full bg-health-ovulation'} />
        <Text className={'text-xs text-gray-600'}>排卵期</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <View className={'h-3 w-3 rounded-full bg-health-luteal'} />
        <Text className={'text-xs text-gray-600'}>黄体期</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <View className={'h-3 w-3 rounded-full bg-health-menstrual'} />
        <Text className={'text-xs text-gray-600'}>月经期</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <MaterialCommunityIcons
          name={'heart-outline'}
          size={16}
          color={'purple'}
        />
        <Text className={'text-xs text-gray-600'}>爱爱 (有措施)</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <MaterialCommunityIcons name={'heart'} size={16} color={'purple'} />
        <Text className={'text-xs text-gray-600'}>爱爱 (无措施)</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <MaterialCommunityIcons
          name={'hand-front-left'}
          size={16}
          color={'pink'}
        />
        <Text className={'text-xs text-gray-600'}>自爱</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <MaterialCommunityIcons
          name={'human-pregnant'}
          size={16}
          color={'red'}
        />
        <Text className={'text-xs text-gray-600'}>排卵日</Text>
      </View>
      <View className={'flex-row items-center gap-1'}>
        <View
          className={
            'h-3 w-3 rounded-full border border-dashed border-health-menstrual'
          }
        />
        <Text className={'text-xs text-gray-600'}>月经期 (预测)</Text>
      </View>
    </View>
  );
});

CalendarLegend.displayName = 'CalendarLegend';

export { CalendarLegend };
