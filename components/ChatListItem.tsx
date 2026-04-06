import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface ChatListItemProps {
  name: string;
  lastMessage: string;
  time: string;
  avatarUrl: string;
  unreadCount?: number;
  onPress: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ 
  name, 
  lastMessage, 
  time, 
  avatarUrl, 
  unreadCount, 
  onPress 
}) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-[#A0A0A0]' : 'text-[#555555]';
  const bgClass = isDarkMode ? 'active:bg-white/5' : 'active:bg-black/5';

  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center p-4 ${bgClass}`}
    >
      <Image 
        source={{ uri: avatarUrl }} 
        className="w-14 h-14 rounded-full mr-4 bg-gray-200 dark:bg-gray-800" 
      />
      
      <View className="flex-1 border-b border-gray-100 dark:border-white/5 pb-4">
        <View className="flex-row justify-between items-center mb-1">
          <Text className={`${textColor} font-bold text-base`}>{name}</Text>
          <Text className={`${secondaryColor} text-xs`}>{time}</Text>
        </View>
        
        <View className="flex-row justify-between items-center">
          <Text className={`${secondaryColor} text-sm flex-1 mr-2`} numberOfLines={1}>
            {lastMessage}
          </Text>
          {unreadCount && unreadCount > 0 ? (
            <View className="bg-[#00FFB2] rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-black text-[10px] font-bold">{unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};
