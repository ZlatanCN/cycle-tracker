import { memo, useEffect, useMemo, useRef } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { GradientBackground } from '@/components/shared/GradientBackground';

type CalendarDatePickerModalProps = {
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  pickerYear: number;
  setPickerYear: (year: number) => void;
  pickerMonth: number;
  setPickerMonth: (month: number) => void;
  handlePickerConfirm: () => void;
};

const CalendarDatePickerModal = memo(
  ({
    showDatePicker,
    setShowDatePicker,
    pickerYear,
    setPickerYear,
    pickerMonth,
    setPickerMonth,
    handlePickerConfirm,
  }: CalendarDatePickerModalProps) => {
    const yearListRef = useRef<FlatList<number> | null>(null);
    const monthListRef = useRef<FlatList<string> | null>(null);

    const months = useMemo<string[]>(
      () => Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
      [],
    );
    const currentYear = useMemo<number>(() => new Date().getFullYear(), []);
    const years = useMemo<number[]>(
      () => Array.from({ length: 12 }, (_, i) => currentYear - 6 + i),
      [currentYear],
    );
    const pickerItemHeight = 34;

    const handleGoToToday = () => {
      const today = new Date();
      setPickerYear(today.getFullYear());
      setPickerMonth(today.getMonth());
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
                        className={`mx-1 h-10 items-center justify-center rounded-lg py-2.5 ${
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
                        className={`mx-1 h-10 items-center justify-center rounded-lg py-2.5 ${
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
              <View className={'mt-4 flex-row justify-between gap-3'}>
                <TouchableOpacity
                  className={
                    'rounded-xl bg-neutral-200 px-6 py-3 active:bg-neutral-300'
                  }
                  onPress={handleGoToToday}
                >
                  <Text className={'font-medium text-gray-700'}>今天</Text>
                </TouchableOpacity>
                <View className={'flex-row gap-3'}>
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
        </View>
      </Modal>
    );
  },
);

CalendarDatePickerModal.displayName = 'CalendarDatePickerModal';

export { CalendarDatePickerModal };
