import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface SectionHeaderProps {
  title: string;
  actionTitle?: string;
  onPressAction?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, actionTitle, onPressAction, className = '' }) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const actionColor = isDarkMode ? 'text-white' : 'text-black';

  return (
    <View className={`flex-row justify-between items-end mb-6 ${className}`}>
      <Text className={`text-black text-2xl font-black tracking-tight`}>{title}</Text>
      {actionTitle && (
        <TouchableOpacity onPress={onPressAction} className="bg-black/5 px-4 py-2 rounded-full">
          <Text className={`text-black/40 text-[10px] font-black uppercase tracking-widest`}>{actionTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
