import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

interface FeaturedCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onPress: () => void;
  className?: string;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({ title, description, imageUrl, onPress, className = '' }) => {
  const { isDarkMode } = useThemeStore();
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F9F9F9]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const descColor = isDarkMode ? 'text-white/40' : 'text-black/50';

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      className={`w-80 mr-6 rounded-[32px] overflow-hidden border border-black/5 bg-white ${className}`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
        elevation: 2
      }}
    >
      <View className="h-44 w-full bg-zinc-100">
        <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
      </View>
      <View className="p-6">
        <Text className="text-black text-xl font-black mb-1.5 tracking-tighter" numberOfLines={1}>{title}</Text>
        <Text className="text-black/40 text-sm mb-6 leading-5 font-medium" numberOfLines={2}>{description}</Text>
        
        <View className="flex-row items-center justify-between">
          <View className="bg-black px-8 py-3.5 rounded-full">
            <Text className="text-white text-[10px] font-black uppercase tracking-widest">Access</Text>
          </View>
          <View className="w-11 h-11 rounded-full bg-black/5 items-center justify-center">
             <Ionicons name="bookmark-outline" size={18} color="black" opacity={0.3} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
