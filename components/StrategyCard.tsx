import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ArrowUpRight } from 'lucide-react-native';

interface StrategyCardProps {
  title: string;
  category: string;
  duration: string;
  price?: string; // Add this
  participants: string[];
  imageUrl?: string; // Add this
  onPress?: () => void;
  width?: number;
}

export const StrategyCard: React.FC<StrategyCardProps> = ({
  title,
  category,
  duration,
  price = "Free", // Default
  participants,
  imageUrl = "https://images.unsplash.com/photo-1611974714658-94189381786e?q=80&w=400&auto=format&fit=crop",
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
      <View className="h-32 w-full relative">
        <Image 
          source={{ uri: imageUrl }} 
          className="w-full h-full" 
          resizeMode="cover"
        />
        <View className="absolute top-4 right-4 flex-row items-center gap-2">
          {/* PRICE BADGE */}
          <View className="bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
            <Text className="text-white text-[12px] font-black">{price === '0' ? 'Free' : `$${price}`}</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-lg">
            <ArrowUpRight size={18} color="black" strokeWidth={2.5} />
          </View>
        </View>
      </View>

      {/* BOTTOM CONTENT */}
      <View className="p-6">
        <View className="mb-4">
          <Text className="text-white/40 text-[11px] font-black tracking-tight uppercase mb-1">
            {category}
          </Text>
          <Text className="text-white text-[18px] font-black tracking-tight leading-6">
            {title}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            {participants.slice(0, 4).map((uri, idx) => (
              <Image
                key={idx}
                source={{ uri }}
                className={`w-8 h-8 rounded-full border-2 border-[#1C1C1E] ${idx > 0 ? '-ml-3' : ''}`}
              />
            ))}
            <View className="w-8 h-8 rounded-full bg-white items-center justify-center -ml-3 border-2 border-[#1C1C1E]">
              <Text className="text-black text-[10px] font-black">+99</Text>
            </View>
          </View>
          <Text className="text-white/40 text-[11px] font-black tracking-tight uppercase">
            {duration}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
