import { memo, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type CalendarDateGridProps = {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  selectedDate: string;
  className?: string;
};

const CalendarDateGrid = memo(
  ({
    currentDate,
    onDateSelect,
    className,
    selectedDate,
  }: CalendarDateGridProps) => {
    const today = useMemo<string>(
      () => new Date().toLocaleDateString('zh-CN'),
      [],
    );

    const healthData = useMemo(
      () => ({
        menstrualDays: ['2024/6/1', '2024/6/2', '2024/6/3', '2024/6/4'], // 月经期
        fertileDays: ['2024/6/12', '2024/6/13', '2024/6/14', '2024/6/15'], // 易孕期
        ovulationDay: '2024/6/14', // 排卵日
        recordedDays: ['2024/6/5', '2024/6/10', '2024/6/20'], // 有记录的日子
      }),
      [],
    );

    const generateMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();

      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      const daysInMonth = lastDayOfMonth.getDate();
      const startDay = firstDayOfMonth.getDay();

      const prevMonthLastDay = new Date(year, month, 0);
      const prevMonthDays = Array.from({ length: startDay }, (_, i) => {
        const day = prevMonthLastDay.getDate() - startDay + i + 1;
        return new Date(year, month - 1, day);
      });

      const currentMonthDays = Array.from(
        { length: daysInMonth },
        (_, i) => new Date(year, month, i + 1),
      );

      const totalDays = prevMonthDays.length + currentMonthDays.length;
      const nextMonthDaysNeeded =
        totalDays > 35 ? 42 - totalDays : 35 - totalDays;

      const nextMonthDays = Array.from(
        { length: nextMonthDaysNeeded },
        (_, i) => new Date(year, month + 1, i + 1),
      );

      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    };

    const getDateType = (date: Date) => {
      const dateString = date.toLocaleDateString('zh-CN');

      if (healthData.ovulationDay === dateString) return 'ovulation';
      if (healthData.menstrualDays.includes(dateString)) return 'menstrual';
      if (healthData.fertileDays.includes(dateString)) return 'fertile';
      if (healthData.recordedDays.includes(dateString)) return 'recorded';
      return 'normal';
    };

    return (
      <View className={`flex-row flex-wrap justify-around ${className}`}>
        {generateMonth(currentDate).map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toLocaleDateString('zh-CN') === today;
          const isSelected = date.toLocaleDateString('zh-CN') === selectedDate;
          const dateType = getDateType(date);

          // 根据日期类型设置样式
          let dateStyle =
            'my-0.5 h-11 w-11 items-center justify-center rounded-xl ';
          let textStyle = 'text-base ';

          if (!isCurrentMonth) {
            dateStyle += 'border-0 ';
            textStyle += 'text-gray-300 ';
          } else {
            switch (dateType) {
              case 'menstrual':
                dateStyle += isSelected
                  ? 'bg-health-cycle border-2 border-health-cycle/60 '
                  : 'bg-health-cycle/30 border border-health-cycle/40 ';
                textStyle += isSelected
                  ? 'text-white font-bold '
                  : 'text-health-cycle font-medium ';
                break;
              case 'ovulation':
                dateStyle += isSelected
                  ? 'bg-primary-500 border-2 border-primary-400 '
                  : 'bg-primary-200 border-2 border-primary-300 ';
                textStyle += isSelected
                  ? 'text-white font-bold '
                  : 'text-primary-700 font-semibold ';
                break;
              case 'fertile':
                dateStyle += isSelected
                  ? 'bg-health-fertile border-2 border-health-fertile/60 '
                  : 'bg-health-fertile/40 border border-health-fertile/50 ';
                textStyle += isSelected
                  ? 'text-white font-bold '
                  : 'text-green-700 font-medium ';
                break;
              case 'recorded':
                dateStyle += isSelected
                  ? 'bg-secondary-400 border-2 border-secondary-300 '
                  : 'bg-secondary-100 border border-secondary-200 ';
                textStyle += isSelected
                  ? 'text-white font-bold '
                  : 'text-secondary-700 font-medium ';
                break;
              default:
                if (isToday) {
                  dateStyle += isSelected
                    ? 'bg-primary-400 border-2 border-primary-300 '
                    : 'bg-primary-100 border-2 border-primary-200 ';
                  textStyle += isSelected
                    ? 'text-white font-bold '
                    : 'text-primary-700 font-semibold ';
                } else {
                  dateStyle += isSelected
                    ? 'bg-primary-400 border-2 border-primary-300 '
                    : 'border border-neutral-200 ';
                  textStyle += isSelected
                    ? 'text-white font-bold '
                    : 'text-gray-600 ';
                }
            }
          }

          return (
            <TouchableOpacity
              key={index}
              className={dateStyle}
              onPress={() => onDateSelect(date)}
              disabled={!isCurrentMonth}
            >
              <Text className={textStyle}>{date.getDate()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },
);

CalendarDateGrid.displayName = 'CalendarDateGrid';

export { CalendarDateGrid };
