import React from 'react';
import { View, Text, Image } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

interface ReviewCardProps {
  userName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  time: string;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ 
  userName, 
  avatarUrl, 
  rating, 
  comment, 
  time, 
  className = '' 
}) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-[#888888]' : 'text-[#555555]';

  return (
    <View className={`p-4 rounded-2xl mb-3 border-b border-gray-100 dark:border-white/5 ${className}`}>
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Image 
            source={{ uri: avatarUrl }} 
            className="w-10 h-10 rounded-full mr-3" 
          />
          <View>
            <Text className={`${textColor} font-bold text-base`}>{userName}</Text>
            <View className="flex-row">
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons 
                  key={s} 
                  name="star" 
                  size={12} 
                  color={s <= rating ? '#00FFB2' : '#888888'} 
                />
              ))}
            </View>
          </View>
        </View>
        <Text className={`${secondaryColor} text-xs`}>{time}</Text>
      </View>
      <Text className={`${secondaryColor} text-sm leading-5`}>{comment}</Text>
    </View>
  );
};
