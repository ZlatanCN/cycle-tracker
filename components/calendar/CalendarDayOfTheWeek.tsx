import { memo } from 'react';
import { Text, View } from 'react-native';
import { DAYS_OF_THE_WEEK } from '@/constants/daysOfTheWeek';

type CalenderDayOfTheWeekProps = {
  className?: string;
};

const CalendarDayOfTheWeek = memo(
  ({ className }: CalenderDayOfTheWeekProps) => {
    return (
      <View className={`flex-row justify-around ${className}`}>
        {DAYS_OF_THE_WEEK.map((day) => (
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
