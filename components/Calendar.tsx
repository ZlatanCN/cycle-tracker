import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');

  const weekDays: string[] = ['日', '一', '二', '三', '四', '五', '六'];
  const today: string = new Date().toLocaleDateString('zh-CN');

  const generateMonth = (date: Date): Date[] => {
    // 获取给定日期的年份和月份
    const year = date.getFullYear();
    const month = date.getMonth();
    // 计算该月的第一天和最后一天
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // 计算前一个月的日期
    const startDay = firstDayOfMonth.getDay();
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthDays = Array.from({ length: startDay }, (_, i) => {
      const day = prevMonthLastDay.getDate() - startDay + i + 1;
      return new Date(year, month - 1, day);
    });

    // 当前月的日期
    const currentMonthDays = Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1),
    );

    // 计算需要补充的下个月天数
    const totalDays = prevMonthDays.length + currentMonthDays.length;
    const nextMonthDaysNeeded =
      totalDays > 35 ? 42 - totalDays : 35 - totalDays;
    const nextMonthDays = Array.from(
      { length: nextMonthDaysNeeded },
      (_, i) => new Date(year, month + 1, i + 1),
    );

    // 返回完整的日历数组，包括前一个月、当前月和下一个月的日期
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // 处理日期选择
  const handleDateSelect = (date: Date) => {
    const dateString = date.toLocaleDateString('zh-CN');

    if (dateString === selectedDate) {
      setSelectedDate('');
    } else {
      setSelectedDate(dateString);
    }
  };

  // 切换月份
  const handleMonthChange = (increment: number) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + increment),
    );
  };

  return (
    <View className="p-4">
      {/* 月份切换头 */}
      <View className="mb-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => handleMonthChange(-1)}>
          <Text className="px-4 text-2xl text-themePurple-700">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-themePurple-700">
          {currentDate.toLocaleString('zh-CN', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        <TouchableOpacity onPress={() => handleMonthChange(1)}>
          <Text className="px-4 text-2xl text-themePurple-700">→</Text>
        </TouchableOpacity>
      </View>

      {/* 星期标题 */}
      <View className="mb-2 flex-row justify-around">
        {weekDays.map((day) => (
          <View key={day} className={'w-[14.28%]'}>
            <Text className="w-10 text-center font-semibold text-gray-500">
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* 日期网格 */}
      <View className="flex-row flex-wrap justify-around">
        {generateMonth(currentDate).map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toLocaleDateString('zh-CN') === today;
          const isSelected = date.toLocaleDateString('zh-CN') === selectedDate;

          return (
            <View key={index} className={'w-[14.28%]'}>
              <TouchableOpacity
                className={`my-0.5 h-10 w-10 items-center justify-center rounded-lg ${
                  isCurrentMonth ? 'border border-gray-200' : 'border-0'
                } ${
                  isToday ? 'bg-themePurple-200' : ''
                } ${isSelected ? 'bg-themePurple' : ''}`}
                onPress={() => handleDateSelect(date)}
                disabled={!isCurrentMonth}
              >
                <Text
                  className={`${isToday ? 'text-white' : ''} ${
                    isCurrentMonth ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export { Calendar };
