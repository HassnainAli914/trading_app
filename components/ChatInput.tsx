import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputProps {
  onSend: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const { isDarkMode } = useThemeStore();
  const [text, setText] = React.useState('');

  const bgClass = isDarkMode ? 'bg-dark-secondary' : 'bg-[#F0F0F0]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const placeholderColor = isDarkMode ? '#A0A0A0' : '#888888';

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View className={`px-4 py-2.5 flex-row items-end border-t border-gray-100 dark:border-white/5 ${bgClass}`}>
      <TouchableOpacity className="mr-3 mb-2">
        <Ionicons name="add" size={24} color="#00FFB2" />
      </TouchableOpacity>
      
      <View className="flex-1 bg-white/5 rounded-2xl px-4 py-1.5 border border-gray-100 dark:border-white/10">
        <TextInput
          placeholder="Message..."
          placeholderTextColor={placeholderColor}
          className={`text-[15px] leading-5 min-h-[36px] max-h-32 ${textColor}`}
          multiline
          value={text}
          onChangeText={setText}
        />
      </View>

      <TouchableOpacity 
        onPress={handleSend}
        className={`ml-3 w-9 h-9 rounded-full items-center justify-center mb-0.5 ${
          text.trim() ? 'bg-[#00FFB2]' : 'bg-gray-400/50 dark:bg-gray-700/50'
        }`}
      >
        <Ionicons name="send" size={16} color={text.trim() ? 'black' : '#888'} />
      </TouchableOpacity>
    </View>
  );
};
