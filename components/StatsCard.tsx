import React from 'react';
import { View, Text } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

interface StatsCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, className = '' }) => {
  const { isDarkMode } = useThemeStore();
  const bgClass = isDarkMode ? 'bg-dark-secondary' : 'bg-[#F0F0F0]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const titleColor = isDarkMode ? 'text-[#A0A0A0]' : 'text-[#555555]';

  return (
    <View className={`flex-1 p-4 rounded-xl items-center justify-center ${bgClass} ${className}`}>
      <View className="bg-[#00FFB2]/20 p-2 rounded-full mb-2">
        <Ionicons name={icon} size={24} color="#00FFB2" />
      </View>
      <Text className={`${textColor} text-xl font-bold mb-1`}>{value}</Text>
      <Text className={`${titleColor} text-xs text-center`}>{title}</Text>
    </View>
  );
};
