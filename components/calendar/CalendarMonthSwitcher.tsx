import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type CalenderMonthSwitcherProps = {
  onMonthChange: (month: number) => void;
  onPickerOpen: () => void;
  currentDate: Date;
  className?: string;
};

const CalendarMonthSwitcher = memo(
  ({
    onMonthChange,
    onPickerOpen,
    currentDate,
    className,
  }: CalenderMonthSwitcherProps) => {
    return (
      <View className={`flex-row items-center justify-between ${className}`}>
        <TouchableOpacity
          onPress={() => onMonthChange(-1)}
          className={
            'rounded-xl bg-neutral-100/60 p-2 active:bg-neutral-200/60'
          }
        >
          <Text className={'text-xl font-medium text-primary-600'}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPickerOpen}
          className={
            'flex-row items-center gap-2 rounded-xl bg-primary-100/80 px-6 py-3 active:bg-primary-200/80'
          }
        >
          <Text className={'text-lg font-semibold text-primary-700'}>
            {currentDate.toLocaleDateString('zh-CN', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onMonthChange(1)}
          className={
            'rounded-xl bg-neutral-100/60 p-2 active:bg-neutral-200/60'
          }
        >
          <Text className={'text-xl font-medium text-primary-600'}>→</Text>
        </TouchableOpacity>
      </View>
    );
  },
);

CalendarMonthSwitcher.displayName = 'CalendarMonthSwitcher';

export { CalendarMonthSwitcher };
