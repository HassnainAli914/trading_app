import React from 'react';
import { View, Text, Image } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface CourseMiniCardProps {
  title: string;
  imageUrl: string;
  progress: number;
}

export const CourseMiniCard: React.FC<CourseMiniCardProps> = ({ 
  title, 
  imageUrl, 
  progress 
}) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-[#888888]' : 'text-[#555555]';
  const cardBg = isDarkMode ? 'bg-dark-secondary' : 'bg-white';
  const progressBg = isDarkMode ? 'bg-white/10' : 'bg-gray-200';

  return (
    <View className={`p-4 rounded-2xl mb-3 flex-row items-center border border-transparent dark:border-white/5 ${cardBg}`}>
      <View className="w-12 h-12 rounded-xl overflow-hidden mr-4 bg-gray-200 dark:bg-gray-800">
        <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
      </View>
      
      <View className="flex-1">
        <Text className={`${textColor} font-bold text-base mb-1`} numberOfLines={1}>{title}</Text>
        <View className="flex-row items-center">
          <View className={`flex-1 h-1.5 rounded-full mr-3 ${progressBg} overflow-hidden`}>
            <View className="h-full bg-[#00FFB2]" style={{ width: `${progress}%` }} />
          </View>
          <Text className={`text-[10px] font-bold ${textColor}`}>{progress}%</Text>
        </View>
      </View>
    </View>
  );
};
