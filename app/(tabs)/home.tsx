import { ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GradientBackground } from '@/components/shared/GradientBackground';
import { Calendar } from '@/components/calendar';

const Home = () => {
  return (
    <ScrollView className={'flex-1 bg-neutral-100 p-4'}>
      {/* 当前周期卡片 - 使用渐变背景和新的主色调 */}
      <GradientBackground
        type={'primary'}
        className={'mb-4 flex-1 p-5 shadow-sm'}
        style={{ borderRadius: 12 }}
      >
        <View className={'flex flex-row items-center justify-start gap-2'}>
          <Ionicons name={'water'} size={20} color={'#9D8BC7'} />
          <Text className={'text-lg font-semibold text-primary-700'}>
            当前周期
          </Text>
        </View>
        <View className={'flex items-center justify-center py-2'}>
          <Text className={'p-3 text-3xl font-bold text-primary-800'}>
            月经期 第 <Text className={'text-5xl text-primary-700'}>3</Text> 天
          </Text>
          <View className={'mb-2 rounded-full bg-health-cycle/10 px-4 py-2'}>
            <Text className={'text-sm text-primary-700'}>
              预计下次月经: 6月15日 (还有22天)
            </Text>
          </View>
          <View className={'rounded-full bg-health-fertile/15 px-4 py-2'}>
            <Text className={'text-sm text-primary-700'}>
              易孕期: 6月1日 - 6月6日
            </Text>
          </View>
        </View>
      </GradientBackground>

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
      <View className={'mb-4 rounded-xl bg-secondary-100 p-5 shadow-sm'}>
        <View className={'flex flex-row items-center justify-start gap-2'}>
          <Ionicons name={'pulse'} size={20} color={'#A67FA6'} />
          <Text className={'text-lg font-semibold text-secondary-700'}>
            今日状态
          </Text>
        </View>
        <View className={'mt-3 flex-row justify-between'}>
          <View
            className={
              'mr-2 flex-1 items-center rounded-lg bg-secondary-200/60 p-3'
            }
          >
            <Ionicons name={'water-outline'} size={24} color={'#8B6B8B'} />
            <Text className={'mt-1 text-xs text-secondary-700'}>经量正常</Text>
          </View>
          <View
            className={
              'mr-2 flex-1 items-center rounded-lg bg-health-calm/20 p-3'
            }
          >
            <Ionicons name={'happy-outline'} size={24} color={'#7A6BA3'} />
            <Text className={'mt-1 text-xs text-primary-700'}>情绪平静</Text>
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
