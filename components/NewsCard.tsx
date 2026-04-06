import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface NewsCardProps {
  title: string;
  summary: string;
  time: string;
  className?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({ title, summary, time, className = '' }) => {
  const { isDarkMode } = useThemeStore();
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F9F9F9]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const summaryColor = isDarkMode ? 'text-white/40' : 'text-black/50';
  const timeColor = isDarkMode ? 'text-white/60' : 'text-black/60';

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      className={`p-6 rounded-[28px] mb-4 flex-row items-center border border-black/5 bg-white ${className}`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.01,
        shadowRadius: 5,
        elevation: 1
      }}
    >
      <View className="w-1.5 h-10 bg-black/10 rounded-full mr-5" />
      <View className="flex-1">
        <Text className="text-black font-black text-[16px] mb-1 tracking-tighter" numberOfLines={1}>{title}</Text>
        <Text className="text-black/40 text-[13px] leading-5 font-medium" numberOfLines={2}>{summary}</Text>
      </View>
      <View className="ml-4 items-end">
        <Text className="text-black/20 text-[9px] font-black uppercase tracking-widest">{time}</Text>
      </View>
    </TouchableOpacity>
  );
};
