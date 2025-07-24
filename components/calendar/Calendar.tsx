import { memo, useState } from 'react';
import { View } from 'react-native';
import {
  CalendarMonthSwitcher
} from '@/components/calendar/CalendarMonthSwitcher';
import {
  CalendarDayOfTheWeek
} from '@/components/calendar/CalendarDayOfTheWeek';
import { CalendarDateGrid } from '@/components/calendar/CalendarDateGrid';
import { CalendarLegend } from '@/components/calendar/CalendarLegend';
import {
  CalendarDatePickerModal
} from '@/components/calendar/CalendarDatePickerModal';

type CalendarProps = {
  selectedDate: string;
  handleDateSelect: (date: Date) => void;
};

const Calendar = memo(({ handleDateSelect, selectedDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [pickerYear, setPickerYear] = useState<number>(
    currentDate.getFullYear(),
  );
  const [pickerMonth, setPickerMonth] = useState<number>(
    currentDate.getMonth(),
  );

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

  return (
    <View className={'p-2'}>
      {/* 月份切换头 */}
      <CalendarMonthSwitcher
        onMonthChange={handleMonthChange}
        onPickerOpen={handlePickerOpen}
        currentDate={currentDate}
        className={'mb-4'}
      />

      {/* 星期标题 */}
      <CalendarDayOfTheWeek className={'mb-3'} />

      {/* 日期网格 */}
      <CalendarDateGrid
        currentDate={currentDate}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      {/* 图例说明 */}
      <CalendarLegend className={'mt-4 gap-4'} />

      {/* 日期选择器模态框 */}
      <CalendarDatePickerModal
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        pickerYear={pickerYear}
        setPickerYear={setPickerYear}
        pickerMonth={pickerMonth}
        setPickerMonth={setPickerMonth}
        handlePickerConfirm={handlePickerConfirm}
      />
    </View>
  );
});

Calendar.displayName = 'Calendar';

export { Calendar };
