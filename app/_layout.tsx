import { Stack } from 'expo-router';
import './global.css';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider } from '@/contexts/BottomSheetContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <StatusBar hidden={true} />
        <Stack>
          <Stack.Screen
            name={"(tabs)"}
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
