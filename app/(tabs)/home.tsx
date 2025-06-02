import { ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Calendar } from '@/components/Calendar';

const Home = () => {
  return (
    <ScrollView className={'flex-1 bg-warmNeutral p-4'}>
      <View className={'mb-4 rounded-xl bg-themePurple-200 p-4'}>
        <View className={'flex flex-row items-center justify-start gap-2'}>
          <Ionicons name={'water'} size={20} color={'#533E9E'} />
          <Text className={'text-lg font-semibold text-themePurple-900'}>
            当前周期
          </Text>
        </View>
        <View className={'flex items-center justify-center'}>
          <Text className={'p-3 text-3xl font-bold text-themePurple-950'}>
            月经期 第 <Text className={'text-5xl'}>3</Text> 天
          </Text>
          <Text className={'text-xs text-themePurple-700'}>
            预计下次月经: 6月15日 (还有22天)
          </Text>
          <Text className={'text-xs text-themePurple-700'}>
            易孕期: 6月1日 - 6月6日
          </Text>
        </View>
      </View>
      <View className={'mb-4 rounded-xl bg-gray-50 p-4'}>
        <View className={'flex flex-row items-center justify-start gap-2'}>
          <Ionicons name={'calendar-number'} size={20} color={'#4B5563'} />
          <Text className={'text-lg font-semibold text-gray-600'}>
            健康日历
          </Text>
        </View>
        <Calendar />
      </View>
    </ScrollView>
  );
};

export default Home;
