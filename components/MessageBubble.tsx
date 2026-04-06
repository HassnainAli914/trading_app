import React from 'react';
import { View, Text } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface MessageBubbleProps {
  message: string;
  time: string;
  isSender: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  time, 
  isSender 
}) => {
  const { isDarkMode } = useThemeStore();
  
  const senderBg = 'bg-[#00FFB2]';
  const receiverBg = isDarkMode ? 'bg-dark-secondary' : 'bg-white';
  const senderTextColor = 'text-black';
  const receiverTextColor = isDarkMode ? 'text-white' : 'text-black';
  const senderTimeColor = 'text-black/60';
  const receiverTimeColor = isDarkMode ? 'text-[#A0A0A0]' : 'text-[#888888]';

  return (
    <View 
      className={`flex-row mb-3 ${isSender ? 'justify-end' : 'justify-start'}`}
    >
      <View 
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isSender 
            ? `${senderBg} rounded-tr-none shadow-sm shadow-[#00FFB2]/20` 
            : `${receiverBg} rounded-tl-none shadow-sm shadow-black/5`
        } border border-transparent dark:border-white/5`}
      >
        <Text className={`text-[15px] font-medium leading-5 ${isSender ? senderTextColor : receiverTextColor}`}>
          {message}
        </Text>
        <View className="flex-row items-center justify-end mt-1">
          <Text 
            className={`text-[10px] ${isSender ? senderTimeColor : receiverTimeColor}`}
          >
            {time}
          </Text>
          {isSender && (
            <View className="ml-1">
              <Text className={`${senderTimeColor} text-[10px]`}>✓✓</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
