import { ScrollView, Switch, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { COLORS } from '@/constants/colors';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView className={'flex-1 bg-neutral-100 p-4'}>
      <View className={'mb-6'}>
        <Text className={'mb-2 text-lg font-semibold text-gray-700'}>通知</Text>
        <View className={'rounded-lg bg-white p-4'}>
          <View className={'flex-row items-center justify-between'}>
            <Text className={'text-base text-gray-800'}>开启通知</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: COLORS.gray[300],
                true: COLORS.primary[300],
              }}
              thumbColor={
                notifications ? COLORS.primary.DEFAULT : COLORS.gray[50]
              }
            />
          </View>
        </View>
      </View>

      <View className={'mb-6'}>
        <Text className={'mb-2 text-lg font-semibold text-gray-700'}>通用</Text>
        <View className={'rounded-lg bg-white p-4'}>
          <View className={'flex-row items-center justify-between'}>
            <Text className={'text-base text-gray-800'}>深色模式</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{
                false: COLORS.gray[300],
                true: COLORS.primary[300],
              }}
              thumbColor={darkMode ? COLORS.primary.DEFAULT : COLORS.gray[50]}
            />
          </View>
          <View className={'my-2 border-t border-gray-200/50'} />
          <View className={'flex-row items-center justify-between'}>
            <Text className={'text-base text-gray-800'}>语言</Text>
            <View className={'flex-row items-center gap-2'}>
              <Text className={'text-gray-600'}>中文</Text>
              <Ionicons
                name={'chevron-forward'}
                size={20}
                color={COLORS.gray[400]}
              />
            </View>
          </View>
        </View>
      </View>

      <View className={'mb-6'}>
        <Text className={'mb-2 text-lg font-semibold text-gray-700'}>关于</Text>
        <View className={'rounded-lg bg-white p-4'}>
          <View className={'flex-row items-center justify-between'}>
            <Text className={'text-base text-gray-800'}>版本</Text>
            <Text className={'text-gray-600'}>1.0.0</Text>
          </View>
          <View className={'my-2 border-t border-gray-200/50'} />
          <View className={'flex-row items-center justify-between'}>
            <Text className={'text-base text-gray-800'}>隐私政策</Text>
            <Ionicons
              name={'chevron-forward'}
              size={20}
              color={COLORS.gray[400]}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;
