import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { GradientBackground } from '@/components/shared/GradientBackground';
import { CalendarMonthSwitcher } from '@/components/calendar/CalendarMonthSwitcher';
import { CalendarDayOfTheWeek } from '@/components/calendar/CalendarDayOfTheWeek';
import { CalendarDateGrid } from '@/components/calendar/CalendarDateGrid';
import { CalendarLegend } from '@/components/calendar/CalendarLegend';

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
      <CalendarMonthSwitcher
        onMonthChange={handleMonthChange}
        onPickerOpen={handlePickerOpen}
        currentDate={currentDate}
        className={'mb-4'}
      />

      {/* 星期标题 - 使用更柔和的颜色 */}
      <CalendarDayOfTheWeek className={'mb-3'} />

      {/* 日期网格 - 增强健康数据可视化 */}
      <CalendarDateGrid
        currentDate={currentDate}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      {/* 图例说明 */}
      <CalendarLegend className={'mt-4 gap-3'} />

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
            <GradientBackground
              type={'primary'}
              className={'border-b border-neutral-200/80 p-5'}
            >
              <Text
                className={'text-center text-xl font-semibold text-primary-700'}
              >
                选择日期
              </Text>
            </GradientBackground>

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
                              ? 'font-semibold text-primary-700'
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
                              ? 'font-semibold text-primary-700'
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
                    'rounded-xl bg-primary-400 px-6 py-3 active:bg-primary-500'
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
