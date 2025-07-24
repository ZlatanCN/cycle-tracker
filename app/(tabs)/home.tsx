import { ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  GradientBackground,
  type GradientType,
} from '@/components/shared/GradientBackground';
import { Calendar } from '@/components/calendar';
import { useState } from 'react';

const Home = () => {
  const [period, setPeriod] = useState<GradientType>('menstrual');

  return (
    <ScrollView className={'flex-1 bg-neutral-100 p-4'}>
      {/* 当前周期卡片 - 使用渐变背景和新的主色调 */}
      <GradientBackground
        type={period}
        style={{
          borderRadius: 12,
        }}
        className={'mb-4 flex-1 p-5 shadow-sm'}
      >
        <View className={'flex flex-row items-center justify-start gap-2'}>
          <Ionicons name={'water'} size={20} className={'text-white'} />
          <Text className={'text-lg font-semibold text-white'}>当前周期</Text>
        </View>
        <View className={'flex items-center justify-center py-2'}>
          <Text className={'p-3 text-3xl font-bold text-white'}>
            月经期 第 <Text className={'text-5xl'}>3</Text> 天
          </Text>
          <View className={'mb-2 rounded-full bg-white/20 px-4 py-2'}>
            <Text className={'text-sm text-white'}>
              预计下次月经: 6月15日 (还有22天)
            </Text>
          </View>
          <View className={'rounded-full bg-white/20 px-4 py-2'}>
            <Text className={'text-sm text-white'}>
              易孕期: 6月1日 - 6月6日
            </Text>
          </View>
        </View>
      </GradientBackground>

      {/* 健康日历卡片 - 使用更柔和的中性色调 */}
      <View className={'mb-4 rounded-xl bg-white p-5 shadow-sm'}>
        <View className={'mb-2 flex flex-row items-center justify-start gap-2'}>
          <Ionicons
            name={'calendar-number'}
            size={20}
            className={'text-neutral-600'}
          />
          <Text className={'text-lg font-semibold text-neutral-700'}>
            健康日历
          </Text>
        </View>
        <Calendar />
      </View>

      {/* 添加一个新的健康状态卡片 */}
      <View className={'mb-4 rounded-xl bg-white p-5 shadow-sm'}>
        <View className={'flex flex-row items-center justify-start gap-2'}>
          <Ionicons name={'pulse'} size={20} className={'text-secondary-500'} />
          <Text className={'text-lg font-semibold text-secondary-700'}>
            今日状态
          </Text>
        </View>
        <View className={'mt-3 flex-row justify-between'}>
          <View
            className={
              'mr-2 flex-1 items-center rounded-lg bg-secondary-100 p-3'
            }
          >
            <Ionicons
              name={'water-outline'}
              size={24}
              className={'text-secondary-500'}
            />
            <Text className={'mt-1 text-xs text-secondary-700'}>经量正常</Text>
          </View>
          <View
            className={'mr-2 flex-1 items-center rounded-lg bg-primary-100 p-3'}
          >
            <Ionicons
              name={'happy-outline'}
              size={24}
              className={'text-primary-500'}
            />
            <Text className={'mt-1 text-xs text-primary-700'}>情绪平静</Text>
          </View>
          <View className={'flex-1 items-center rounded-lg bg-neutral-200 p-3'}>
            <Ionicons
              name={'fitness-outline'}
              size={24}
              className={'text-neutral-600'}
            />
            <Text className={'mt-1 text-xs text-neutral-700'}>轻度运动</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
