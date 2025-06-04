import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

const Calendar = memo(() => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [pickerYear, setPickerYear] = useState<number>(
    currentDate.getFullYear(),
  );
  const [pickerMonth, setPickerMonth] = useState<number>(
    currentDate.getMonth(),
  );

  const yearListRef = useRef<FlatList<number> | null>(null);
  const monthListRef = useRef<FlatList<string> | null>(null);

  const weekDays = useMemo<string[]>(
    () => ['日', '一', '二', '三', '四', '五', '六'],
    [],
  );
  const today = useMemo<string>(
    () => new Date().toLocaleDateString('zh-CN'),
    [],
  );
  const months = useMemo<string[]>(
    () => Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
    [],
  );
  const currentYear = useMemo<number>(() => new Date().getFullYear(), []);
  const years = useMemo<number[]>(
    () => Array.from({ length: 101 }, (_, i) => currentYear - 50 + i),
    [currentYear],
  );
  const pickerItemHeight = 36.7;

  // 模拟健康数据 - 实际使用时从props或状态管理获取
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

  const handleDateSelect = (date: Date) => {
    const dateString = date.toLocaleDateString('zh-CN');

    if (dateString === selectedDate) {
      setSelectedDate('');
    } else {
      setSelectedDate(dateString);
    }
  };

  const handleMonthChange = (increment: number) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + increment),
    );
  };

  const handlePickerOpen = () => {
    setPickerYear(currentDate.getFullYear());
    setPickerMonth(currentDate.getMonth());
    setShowDatePicker(true);
  };

  const handlePickerConfirm = () => {
    setCurrentDate(new Date(pickerYear, pickerMonth));
    setShowDatePicker(false);
  };

  useEffect(() => {
    if (showDatePicker) {
      const yearIndex = years.findIndex((y) => y === pickerYear);
      const monthIndex = pickerMonth;

      if (yearIndex !== -1 && yearListRef.current) {
        setTimeout(() => {
          yearListRef.current?.scrollToIndex({
            index: yearIndex,
            animated: true,
            viewPosition: 0.5,
          });
        }, 150);
      }

      if (
        monthIndex >= 0 &&
        monthIndex < months.length &&
        monthListRef.current
      ) {
        setTimeout(() => {
          monthListRef.current?.scrollToIndex({
            index: monthIndex,
            animated: true,
            viewPosition: 0.5,
          });
        }, 150);
      }
    }
  }, [showDatePicker, pickerYear, pickerMonth, years, months]);

  return (
    <View className={'p-2'}>
      {/* 月份切换头 - 使用更柔和的设计 */}
      <View className={'mb-4 flex-row items-center justify-between'}>
        <TouchableOpacity
          onPress={() => handleMonthChange(-1)}
          className={
            'rounded-full bg-neutral-200/60 p-2 active:bg-neutral-300/60'
          }
        >
          <Text className={'text-primary-600 text-xl font-medium'}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePickerOpen}
          className={
            'bg-primary-100/80 active:bg-primary-200/80 flex-row items-center gap-2 rounded-xl px-6 py-3'
          }
        >
          <Text className={'text-primary-700 text-lg font-semibold'}>
            {currentDate.toLocaleDateString('zh-CN', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMonthChange(1)}
          className={
            'rounded-full bg-neutral-200/60 p-2 active:bg-neutral-300/60'
          }
        >
          <Text className={'text-primary-600 text-xl font-medium'}>→</Text>
        </TouchableOpacity>
      </View>

      {/* 星期标题 - 使用更柔和的颜色 */}
      <View className={'mb-3 flex-row justify-around'}>
        {weekDays.map((day) => (
          <View key={day} className={'w-[14.28%]'}>
            <Text
              className={'w-10 text-center text-base font-medium text-gray-500'}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* 日期网格 - 增强健康数据可视化 */}
      <View className={'flex-row flex-wrap justify-around'}>
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
            <View key={index} className={'w-[14.28%]'}>
              <TouchableOpacity
                className={dateStyle}
                onPress={() => handleDateSelect(date)}
                disabled={!isCurrentMonth}
              >
                <Text className={textStyle}>{date.getDate()}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* 图例说明 */}
      <View className={'mt-4 flex-row flex-wrap justify-center gap-3'}>
        <View className={'flex-row items-center gap-1'}>
          <View className={'bg-health-cycle/60 h-3 w-3 rounded-full'} />
          <Text className={'text-xs text-gray-600'}>月经期</Text>
        </View>
        <View className={'flex-row items-center gap-1'}>
          <View className={'bg-health-fertile/60 h-3 w-3 rounded-full'} />
          <Text className={'text-xs text-gray-600'}>易孕期</Text>
        </View>
        <View className={'flex-row items-center gap-1'}>
          <View className={'bg-primary-300 h-3 w-3 rounded-full'} />
          <Text className={'text-xs text-gray-600'}>排卵日</Text>
        </View>
        <View className={'flex-row items-center gap-1'}>
          <View className={'bg-secondary-200 h-3 w-3 rounded-full'} />
          <Text className={'text-xs text-gray-600'}>有记录</Text>
        </View>
      </View>

      {/* 日期选择器模态框 - 使用新配色 */}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className={'flex-1 items-center justify-center bg-black/40'}>
          <View
            className={
              'w-4/5 overflow-hidden rounded-2xl bg-neutral-50 shadow-2xl'
            }
          >
            <View
              className={
                'bg-gradient-primary border-b border-neutral-200/80 p-5'
              }
            >
              <Text
                className={'text-primary-700 text-center text-xl font-semibold'}
              >
                选择日期
              </Text>
            </View>

            <View className={'p-5'}>
              <View className={'mb-4 flex-row justify-between gap-3'}>
                {/* 年份选择 */}
                <View className={'h-60 flex-1'}>
                  <Text
                    className={
                      'mb-3 text-center text-sm font-medium text-gray-600'
                    }
                  >
                    年份
                  </Text>
                  <FlatList
                    ref={yearListRef}
                    data={years}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }: { item: number }) => (
                      <TouchableOpacity
                        key={item}
                        className={`mx-1 rounded-lg py-2.5 ${
                          pickerYear === item
                            ? 'bg-primary-100'
                            : 'active:bg-neutral-100'
                        }`}
                        onPress={() => setPickerYear(item)}
                      >
                        <Text
                          className={`text-center ${
                            pickerYear === item
                              ? 'text-primary-700 font-semibold'
                              : 'text-gray-700'
                          }`}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={(
                      data: ArrayLike<number> | null | undefined,
                      index: number,
                    ) => ({
                      length: pickerItemHeight,
                      offset: pickerItemHeight * index,
                      index,
                    })}
                    className={
                      'rounded-xl border border-neutral-200/80 bg-white px-2'
                    }
                  />
                </View>

                {/* 月份选择 */}
                <View className={'h-60 flex-1'}>
                  <Text
                    className={
                      'mb-3 text-center text-sm font-medium text-gray-600'
                    }
                  >
                    月份
                  </Text>
                  <FlatList
                    ref={monthListRef}
                    data={months}
                    keyExtractor={(item, index) => item + index.toString()}
                    renderItem={({
                      item,
                      index,
                    }: {
                      item: string;
                      index: number;
                    }) => (
                      <TouchableOpacity
                        key={item}
                        className={`mx-1 rounded-lg py-2.5 ${
                          pickerMonth === index
                            ? 'bg-primary-100'
                            : 'active:bg-neutral-100'
                        }`}
                        onPress={() => setPickerMonth(index)}
                      >
                        <Text
                          className={`text-center ${
                            pickerMonth === index
                              ? 'text-primary-700 font-semibold'
                              : 'text-gray-700'
                          }`}
                        >
                          {item} 月
                        </Text>
                      </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={(
                      data: ArrayLike<string> | null | undefined,
                      index: number,
                    ) => ({
                      length: pickerItemHeight,
                      offset: pickerItemHeight * index,
                      index,
                    })}
                    className={
                      'rounded-xl border border-neutral-200/80 bg-white px-2'
                    }
                  />
                </View>
              </View>

              {/* 按钮 */}
              <View className={'mt-4 flex-row justify-end gap-3'}>
                <TouchableOpacity
                  className={
                    'rounded-xl bg-neutral-200 px-6 py-3 active:bg-neutral-300'
                  }
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text className={'font-medium text-gray-700'}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={
                    'bg-primary-400 active:bg-primary-500 rounded-xl px-6 py-3'
                  }
                  onPress={handlePickerConfirm}
                >
                  <Text className={'font-medium text-white'}>确定</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});

Calendar.displayName = 'Calendar';

export { Calendar };
