import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface CategoryPillProps {
  label: string;
  icon?: any;
  active?: boolean;
  onPress?: () => void;
  className?: string;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ 
  label, 
  active = false, 
  onPress, 
  className = '' 
}) => {
  const { isDarkMode } = useThemeStore();
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      className={`px-6 h-12 rounded-full items-center justify-center mr-3 ${
        active 
          ? (isDarkMode ? 'bg-white' : 'bg-black') 
          : (isDarkMode ? 'bg-white/5' : 'bg-black/5')
      } ${className}`}
    >
      <Text className={`text-[15px] font-black tracking-tight ${
        active 
          ? (isDarkMode ? 'text-black' : 'text-white') 
          : (isDarkMode ? 'text-white/40' : 'text-black/40')
      }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
