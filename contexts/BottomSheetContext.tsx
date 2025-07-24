import { createContext, ReactNode, useContext, useState } from 'react';

type BottomSheetContextType = {
  isVisible: boolean;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  showBottomSheet: (date: string) => void;
  hideBottomSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within BottomSheetProvider');
  }
  return context;
};

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const showBottomSheet = (date: string) => {
    setSelectedDate(date);
    setIsVisible(true);
  };

  const hideBottomSheet = () => {
    setIsVisible(false);
    setSelectedDate('');
  };

  return (
    <BottomSheetContext.Provider
      value={{
        isVisible,
        selectedDate,
        setSelectedDate,
        showBottomSheet,
        hideBottomSheet,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};
