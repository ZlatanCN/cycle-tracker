import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

const Calendar = memo(() => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [pickerYear, setPickerYear] = useState<number>(currentDate.getFullYear());
  const [pickerMonth, setPickerMonth] = useState<number>(currentDate.getMonth());

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
  const pickerItemHeight = 33.2;

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

      if (monthIndex >= 0 && monthIndex < months.length && monthListRef.current) {
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
    <View className={'p-4'}>
      {/* 月份切换头 */}
      <View className={'mb-4 flex-row items-center justify-between'}>
        <TouchableOpacity onPress={() => handleMonthChange(-1)}>
          <Text className={'px-4 text-2xl text-themePurple-700'}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePickerOpen}
          className={
            'flex-row items-center gap-2 rounded-lg bg-themePurple-100 px-4 py-2'
          }
        >
          <Text className={'text-lg font-bold text-themePurple-700'}>
            {currentDate.toLocaleDateString('zh-CN', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMonthChange(1)}>
          <Text className={'px-4 text-2xl text-themePurple-700'}>→</Text>
        </TouchableOpacity>
      </View>

      {/* 星期标题 */}
      <View className={'mb-2 flex-row justify-around'}>
        {weekDays.map((day) => (
          <View key={day} className={'w-[14.28%]'}>
            <Text
              className={'w-10 text-center text-lg font-semibold text-gray-500'}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* 日期网格 */}
      <View className={'flex-row flex-wrap justify-around'}>
        {generateMonth(currentDate).map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toLocaleDateString('zh-CN') === today;
          const isSelected = date.toLocaleDateString('zh-CN') === selectedDate;

          return (
            <View key={index} className={'w-[14.28%]'}>
              <TouchableOpacity
                className={`my-0.5 h-10 w-10 items-center justify-center rounded-lg ${
                  isCurrentMonth ? 'border border-gray-200' : 'border-0'
                } ${isToday ? 'bg-themePurple-200' : ''} ${
                  isSelected ? 'bg-themePurple' : ''
                }`}
                onPress={() => handleDateSelect(date)}
                disabled={!isCurrentMonth}
              >
                <Text
                  className={`text-lg ${
                    isSelected
                      ? 'font-bold text-white'
                      : isCurrentMonth
                      ? 'text-gray-600'
                      : 'text-gray-300'
                  }`}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* 日期选择器 */}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className={'flex-1 items-center justify-center bg-black/30'}>
          <View
            className={
              'w-4/5 overflow-hidden rounded-2xl bg-warmNeutral-50 shadow-lg'
            }
          >
            <View className={'border-b border-warmNeutral-200 bg-white p-4'}>
              <Text
                className={
                  'text-center text-xl font-bold text-themePurple-700'
                }
              >
                选择日期
              </Text>
            </View>

            <View className={'p-4'}>
              <View className={'mb-4 flex-row justify-between'}>
                {/* 年份选择 */}
                <View className={'h-60 w-1/2'}>
                  <Text
                    className={
                      'mb-2 text-center text-sm font-medium text-gray-600'
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
                        className={`py-2 ${
                          pickerYear === item
                            ? 'rounded-lg bg-themePurple-100'
                            : ''
                        }`}
                        onPress={() => setPickerYear(item)}
                      >
                        <Text
                          className={`text-center ${
                            pickerYear === item
                              ? 'font-bold text-themePurple-700'
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
                      'rounded-lg border border-warmNeutral-200 bg-white px-2'
                    }
                  />
                </View>

                {/* 月份选择 */}
                <View className={'h-60 w-1/2'}>
                  <Text
                    className={
                      'mb-2 text-center text-sm font-medium text-gray-600'
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
                        className={`py-2 ${
                          pickerMonth === index
                            ? 'rounded-lg bg-themePurple-100'
                            : ''
                        }`}
                        onPress={() => setPickerMonth(index)}
                      >
                        <Text
                          className={`text-center ${
                            pickerMonth === index
                              ? 'font-bold text-themePurple-700'
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
                      'rounded-lg border border-warmNeutral-200 bg-white px-2'
                    }
                  />
                </View>
              </View>

              {/* 按钮 */}
              <View className={'mt-2 flex-row justify-end gap-3'}>
                <TouchableOpacity
                  className={
                    'rounded-lg bg-gray-100 px-5 py-2.5 active:bg-gray-200'
                  }
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text className={'font-semibold text-gray-700'}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={
                    'rounded-lg bg-themePurple px-5 py-2.5 active:bg-themePurple-600'
                  }
                  onPress={handlePickerConfirm}
                >
                  <Text className={'font-semibold text-white'}>确定</Text>
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