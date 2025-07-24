import { ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/constants/colors';

const Statistics = () => {
  // Mock data for charts and stats
  const cycleLength = 28;
  const periodLength = 5;
  const moodData = ['平静', '愉悦', '低落', '平静', '愉悦'];

  return (
    <ScrollView className={'flex-1 bg-neutral-100 p-4'}>
      {/* Cycle Stats Card */}
      <View className={'mb-6 rounded-lg bg-white p-4'}>
        <View className={'mb-4 flex-row items-center gap-2'}>
          <Ionicons
            name={'sync-circle-outline'}
            size={24}
            color={COLORS.primary[700]}
          />
          <Text className={'text-lg font-semibold text-primary-700'}>
            周期统计
          </Text>
        </View>
        <View className={'flex-row justify-around'}>
          <View className={'items-center'}>
            <Text className={'text-3xl font-bold text-primary-800'}>
              {cycleLength}
            </Text>
            <Text className={'text-sm text-primary-700'}>平均周期长度</Text>
          </View>
          <View className={'items-center'}>
            <Text className={'text-3xl font-bold text-primary-800'}>
              {periodLength}
            </Text>
            <Text className={'text-sm text-primary-700'}>平均经期天数</Text>
          </View>
        </View>
      </View>

      {/* Mood Chart Card */}
      <View className={'mb-6 rounded-lg bg-white p-4'}>
        <View className={'mb-4 flex-row items-center gap-2'}>
          <Ionicons
            name={'happy-outline'}
            size={24}
            color={COLORS.secondary[700]}
          />
          <Text className={'text-lg font-semibold text-secondary-700'}>
            情绪波动
          </Text>
        </View>
        {/* Placeholder for a chart */}
        <View
          className={
            'h-40 items-center justify-center rounded-lg bg-secondary-100/50'
          }
        >
          <Text className={'text-secondary-600'}>[情绪图表占位符]</Text>
        </View>
      </View>

      {/* Symptoms Card */}
      <View className={'mb-6 rounded-lg bg-white p-4'}>
        <View className={'mb-4 flex-row items-center gap-2'}>
          <Ionicons
            name={'thermometer-outline'}
            size={24}
            color={COLORS.warning.dark}
          />
          <Text className={'text-lg font-semibold text-yellow-700'}>
            常见症状
          </Text>
        </View>
        <View className={'flex-row flex-wrap gap-2'}>
          <View className={'rounded-full bg-warning-light px-3 py-1'}>
            <Text className={'text-sm text-warning-dark'}>疲劳</Text>
          </View>
          <View className={'rounded-full bg-warning-light px-3 py-1'}>
            <Text className={'text-sm text-warning-dark'}>腹胀</Text>
          </View>
          <View className={'rounded-full bg-warning-light px-3 py-1'}>
            <Text className={'text-sm text-warning-dark'}>头痛</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Statistics;
