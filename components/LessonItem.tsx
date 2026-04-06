import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

interface LessonItemProps {
  id: string;
  title: string;
  duration: string;
  isLocked: boolean;
  onPress: () => void;
  className?: string;
}

export const LessonItem: React.FC<LessonItemProps> = ({ 
  title, 
  duration, 
  isLocked, 
  onPress, 
  className = '' 
}) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-[#888888]' : 'text-[#555555]';
  const cardBg = isDarkMode ? 'bg-dark-secondary' : 'bg-white';

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.7}
      className={`p-4 rounded-2xl mb-3 flex-row items-center border border-transparent dark:border-white/5 ${cardBg} ${className}`}
    >
      <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
        isLocked ? 'bg-gray-200 dark:bg-gray-800' : 'bg-[#00FFB2]/20'
      }`}>
        <Ionicons 
          name={isLocked ? 'lock-closed' : 'play'} 
          size={20} 
          color={isLocked ? '#888888' : '#00FFB2'} 
        />
      </View>

      <View className="flex-1">
        <Text className={`${textColor} font-bold text-base mb-1`} numberOfLines={1}>
          {title}
        </Text>
        <Text className={`${secondaryColor} text-xs`}>{duration}</Text>
      </View>

      {!isLocked && (
        <Ionicons name="chevron-forward" size={20} color="#888888" />
      )}
    </TouchableOpacity>
  );
};
