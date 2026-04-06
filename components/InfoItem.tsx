import React from 'react';
import { View, Text } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface InfoItemProps {
  label: string;
  value: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-white/30' : 'text-black/30';
  const cardBg = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white';

  return (
    <View className={`p-6 rounded-[24px] mb-4 border border-white/5 shadow-sm ${cardBg}`}>
      <Text className={`${secondaryColor} text-[10px] font-black uppercase tracking-[3px] mb-2`}>{label}</Text>
      <Text className={`${textColor} text-[17px] font-black tracking-tight`}>{value}</Text>
    </View>
  );
};
