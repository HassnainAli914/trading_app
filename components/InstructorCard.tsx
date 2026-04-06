import React from 'react';
import { View, Text, Image } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface InstructorCardProps {
  name: string;
  avatarUrl: string;
  bio: string;
  className?: string;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({ 
  name, 
  avatarUrl, 
  bio, 
  className = '' 
}) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-[#888888]' : 'text-[#555555]';
  const cardBg = isDarkMode ? 'bg-dark-secondary' : 'bg-white';

  return (
    <View className={`p-4 rounded-2xl border border-transparent dark:border-white/5 ${cardBg} ${className}`}>
      <View className="flex-row items-center mb-3">
        <Image 
          source={{ uri: avatarUrl }} 
          className="w-12 h-12 rounded-full border-2 border-[#00FFB2] mr-3" 
        />
        <View>
          <Text className={`${textColor} font-bold text-lg`}>{name}</Text>
          <Text className="text-[#00FFB2] text-xs font-bold uppercase tracking-wider">Expert Instructor</Text>
        </View>
      </View>
      <Text className={`${secondaryColor} text-sm leading-5`}>{bio}</Text>
    </View>
  );
};
