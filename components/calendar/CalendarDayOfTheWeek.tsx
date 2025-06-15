import { memo, useMemo } from 'react';
import { Text, View } from 'react-native';

type CalenderDayOfTheWeekProps = {
  className?: string;
};

const CalendarDayOfTheWeek = memo(
  ({ className }: CalenderDayOfTheWeekProps) => {
    const weekDays = useMemo<string[]>(
      () => ['日', '一', '二', '三', '四', '五', '六'],
      [],
    );

    return (
      <View className={`flex-row justify-around ${className}`}>
        {weekDays.map((day) => (
          <Text
            key={day}
            className={'text-center text-base font-medium text-gray-500'}
          >
            {day}
          </Text>
        ))}
      </View>
    );
  },
);

CalendarDayOfTheWeek.displayName = 'CalendarDayOfTheWeek';

export { CalendarDayOfTheWeek };
