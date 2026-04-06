import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface ProgressCardProps {
  title: string;
  category: string;
  progress: number;
  lessons: string;
  imageUrl?: string; // Add this
  onPress?: () => void;
  width?: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  category,
  progress,
  lessons,
  imageUrl = "https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=400&auto=format&fit=crop",
  onPress,
  width,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-[#1C1C1E] rounded-[32px] overflow-hidden mr-4"
      style={{ width: width || 300 }}
    >
      {/* TOP IMAGE */}
      <View className="h-32 w-full">
        <Image 
          source={{ uri: imageUrl }} 
          className="w-full h-full" 
          resizeMode="cover"
        />
      </View>

      {/* BOTTOM CONTENT */}
      <View className="p-6">
        <View className="mb-4">
          <Text className="text-white/40 text-[11px] font-black tracking-tight mb-1 uppercase">
            {category}
          </Text>
          <Text className="text-white text-[16px] font-black tracking-tight leading-5">
            {title}
          </Text>
        </View>

        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-white/60 text-[10px] font-black tracking-tight">{progress}%</Text>
            <Text className="text-white/40 text-[10px] font-bold tracking-tight uppercase">{lessons}</Text>
          </View>
          {/* PROGRESS BAR */}
          <View className="h-[6px] w-full bg-white/10 rounded-full overflow-hidden">
            <View 
              className="h-full bg-white rounded-full" 
              style={{ width: `${progress}%` }} 
            />
          </View>
        </View>

        <TouchableOpacity 
          className="w-full h-11 bg-white rounded-full items-center justify-center shadow-lg"
          onPress={onPress}
        >
          <Text className="text-black text-[13px] font-black">Continue</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
