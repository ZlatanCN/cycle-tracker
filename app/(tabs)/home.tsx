import { ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Calendar } from '@/components/Calendar';

const Home = () => {
  return (
    <ScrollView className={'flex-1 bg-neutral-100 p-4'}>
      {/* 当前周期卡片 - 使用渐变背景和新的主色调 */}
      <View className={'bg-gradient-primary mb-4 rounded-xl p-5 shadow-sm'}>
        <View className={'flex flex-row items-center justify-start gap-2'}>
          <Ionicons name={'water'} size={20} color={'#9D8BC7'} />
          <Text className={'text-primary-700 text-lg font-semibold'}>
            当前周期
          </Text>
        </View>
        <View className={'flex items-center justify-center py-2'}>
          <Text className={'text-primary-800 p-3 text-3xl font-bold'}>
            月经期 第 <Text className={'text-primary-700 text-5xl'}>3</Text> 天
          </Text>
          <View className={'bg-health-cycle/10 mb-2 rounded-full px-4 py-2'}>
            <Text className={'text-primary-700 text-sm'}>
              预计下次月经: 6月15日 (还有22天)
            </Text>
          </View>
          <View className={'bg-health-fertile/15 rounded-full px-4 py-2'}>
            <Text className={'text-primary-700 text-sm'}>
              易孕期: 6月1日 - 6月6日
            </Text>
          </View>
        </View>
      </View>

      {/* 健康日历卡片 - 使用更柔和的中性色调 */}
      <View className={'mb-4 rounded-xl bg-neutral-50 p-5 shadow-sm'}>
        <View className={'mb-2 flex flex-row items-center justify-start gap-2'}>
          <Ionicons name={'calendar-number'} size={20} color={'#78716C'} />
          <Text className={'text-lg font-semibold text-gray-700'}>
            健康日历
          </Text>
        </View>
        <Calendar />
      </View>

      {/* 添加一个新的健康状态卡片 */}
      <View className={'bg-secondary-100 mb-4 rounded-xl p-5 shadow-sm'}>
        <View className={'flex flex-row items-center justify-start gap-2'}>
          <Ionicons name={'pulse'} size={20} color={'#A67FA6'} />
          <Text className={'text-secondary-700 text-lg font-semibold'}>
            今日状态
          </Text>
        </View>
        <View className={'mt-3 flex-row justify-between'}>
          <View
            className={
              'bg-secondary-200/60 mr-2 flex-1 items-center rounded-lg p-3'
            }
          >
            <Ionicons name={'water-outline'} size={24} color={'#8B6B8B'} />
            <Text className={'text-secondary-700 mt-1 text-xs'}>经量正常</Text>
          </View>
          <View
            className={
              'bg-health-calm/20 mr-2 flex-1 items-center rounded-lg p-3'
            }
          >
            <Ionicons name={'happy-outline'} size={24} color={'#7A6BA3'} />
            <Text className={'text-primary-700 mt-1 text-xs'}>情绪平静</Text>
          </View>
          <View
            className={'flex-1 items-center rounded-lg bg-neutral-200/80 p-3'}
          >
            <Ionicons name={'fitness-outline'} size={24} color={'#7D6F61'} />
            <Text className={'mt-1 text-xs text-neutral-700'}>轻度运动</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
