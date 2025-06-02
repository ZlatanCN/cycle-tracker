import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabsLayout = () => {
  const activeColor = '#A998F0';
  const inactiveColor = '#6B7280';
  const iconSize = 20;

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: '主页',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={'home-sharp'}
              color={focused ? activeColor : inactiveColor}
              size={iconSize}
            />
          ),
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: '统计',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={'analytics-sharp'}
              color={focused ? activeColor : inactiveColor}
              size={iconSize}
            />
          ),
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '设置',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={'settings-sharp'}
              color={focused ? activeColor : inactiveColor}
              size={iconSize}
            />
          ),
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
