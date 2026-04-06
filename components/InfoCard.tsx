import React from 'react';
import { View, Text } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

interface InfoCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ 
  icon, 
  label, 
  value, 
  className = '' 
}) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-[#888888]' : 'text-[#555555]';
  const cardBg = isDarkMode ? 'bg-dark-secondary' : 'bg-[#F0F0F0]';

  return (
    <View className={`flex-1 p-3 rounded-2xl items-center justify-center ${cardBg} ${className}`}>
      <View className="bg-[#00FFB2]/20 p-2 rounded-full mb-2">
        <Ionicons name={icon} size={20} color="#00FFB2" />
      </View>
      <Text className={`${textColor} text-base font-bold mb-0.5`}>{value}</Text>
      <Text className={`${secondaryColor} text-[10px] uppercase font-bold tracking-widest`}>{label}</Text>
    </View>
  );
};
