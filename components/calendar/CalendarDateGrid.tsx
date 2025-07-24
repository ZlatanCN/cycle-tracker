import { memo, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

    const healthData = useMemo(() => {
      const dataMap = new Map<string, string[]>();

      const addData = (type: string, dates: string[]) => {
        dates.forEach((date) => {
          if (!dataMap.has(date)) {
            dataMap.set(date, []);
          }
          dataMap.get(date)?.push(type);
        });
      };

      // 卵泡期
      addData('follicular', [
        '2025/7/1',
        '2025/7/2',
        '2025/7/3',
        '2025/7/4',
        '2025/7/5',
        '2025/7/6',
        '2025/7/7',
        '2025/7/8',
        '2025/7/9',
        '2025/7/10',
      ]);
      // 排卵期
      addData('ovulation', [
        '2025/7/11',
        '2025/7/12',
        '2025/7/13',
        '2025/7/14',
      ]);
      // 黄体期
      addData('luteal', [
        '2025/7/15',
        '2025/7/16',
        '2025/7/17',
        '2025/7/18',
        '2025/7/19',
        '2025/7/20',
        '2025/7/21',
        '2025/7/22',
        '2025/7/23',
        '2025/7/24',
        '2025/7/25',
        '2025/7/26',
        '2025/7/27',
        '2025/7/28',
      ]);
      // 月经期
      addData('menstrual', ['2025/7/29', '2025/7/30', '2025/7/31']);
      // 排卵日
      addData('ovulation', ['2025/7/14']);
      // 预测的月经期
      addData('predictedMenstrual', [
        '2025/8/1',
        '2025/8/2',
        '2025/8/3',
        '2025/8/4',
      ]);
      // 性生活 (有措施)
      addData('sexWithProtection', ['2025/7/12', '2025/7/20']);
      // 性生活 (无措施)
      addData('sexWithoutProtection', ['2025/7/14']);
      // 自慰
      addData('masturbation', ['2025/7/8', '2025/7/18']);

      return dataMap;
    }, []);

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

    const getDateTypes = (date: Date): string[] => {
      const dateString = date.toLocaleDateString('zh-CN');
      return healthData.get(dateString) || [];
    };

    return (
      <View className={`flex-row flex-wrap justify-around ${className}`}>
        {generateMonth(currentDate).map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toLocaleDateString('zh-CN') === today;
          const isSelected = date.toLocaleDateString('zh-CN') === selectedDate;
          const dateTypes = getDateTypes(date);

          // 根据日期类型设置样式
          let dateStyle =
            'my-0.5 h-11 w-11 items-center justify-center rounded-xl ';
          let textStyle = 'text-base ';

          if (!isCurrentMonth) {
            dateStyle += 'border-0 ';
            textStyle += 'text-gray-300 ';
          } else {
            // 根据日期类型设置日期格以及文本的样式
            if (dateTypes.includes('menstrual')) {
              dateStyle += isToday
                ? 'bg-health-menstrual border-2 border-health-menstrual-dark '
                : 'bg-health-menstrual-light border border-health-menstrual ';
              textStyle += isToday
                ? 'text-white font-bold '
                : 'text-health-menstrual-dark font-medium ';
            } else if (dateTypes.includes('ovulation')) {
              dateStyle += isToday
                ? 'bg-health-ovulation border-2 border-health-ovulation-dark '
                : 'bg-health-ovulation-light border border-health-ovulation ';
              textStyle += isToday
                ? 'text-white font-bold '
                : 'text-health-ovulation-dark font-medium ';
            } else if (dateTypes.includes('follicular')) {
              dateStyle += isToday
                ? 'bg-health-follicular border-2 border-health-follicular-dark '
                : 'bg-health-follicular-light border border-health-follicular ';
              textStyle += isToday
                ? 'text-white font-bold '
                : 'text-health-follicular-dark font-medium ';
            } else if (dateTypes.includes('luteal')) {
              dateStyle += isToday
                ? 'bg-health-luteal border-2 border-health-luteal-dark '
                : 'bg-health-luteal-light border border-health-luteal ';
              textStyle += isToday
                ? 'text-white font-bold '
                : 'text-health-luteal-dark font-medium ';
            } else if (dateTypes.includes('predictedMenstrual')) {
              dateStyle += isToday
                ? 'bg-health-menstrual border-2 border-dashed border-health-menstrual-dark '
                : 'border-2 border-dashed border-health-menstrual ';
              textStyle += isToday
                ? 'text-white font-bold '
                : 'text-health-menstrual-dark font-medium ';
            } else {
              dateStyle += isToday
                ? 'bg-primary-400 border-2 border-primary-300 '
                : 'border border-neutral-200 ';
              textStyle += isToday ? 'text-white font-bold ' : 'text-gray-600 ';
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
              <View className={'absolute bottom-0.5 flex-row'}>
                {dateTypes.includes('sexWithProtection') && (
                  <MaterialCommunityIcons
                    name={'heart-outline'}
                    size={8}
                    color={'purple'}
                  />
                )}
                {dateTypes.includes('sexWithoutProtection') && (
                  <MaterialCommunityIcons
                    name={'heart'}
                    size={8}
                    color={'purple'}
                  />
                )}
                {dateTypes.includes('masturbation') && (
                  <MaterialCommunityIcons
                    name={'handshake'}
                    size={8}
                    color={'pink'}
                  />
                )}
                {dateTypes.includes('ovulation') && (
                  <MaterialCommunityIcons
                    name={'human-pregnant'}
                    size={8}
                    color={'red'}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },
);

CalendarDateGrid.displayName = 'CalendarDateGrid';

export { CalendarDateGrid };
