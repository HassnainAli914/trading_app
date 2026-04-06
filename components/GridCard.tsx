import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

interface GridCardProps {
  title: string;
  market: string;
  price: string;
  imageUrl: string;
  width?: number; // Add this
  onPress?: () => void;
  onActionPress?: () => void;
}

export const GridCard: React.FC<GridCardProps> = ({ 
  title, 
  market, 
  price, 
  imageUrl, 
  width, 
  onPress, 
  onActionPress 
}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onPress}
      className="bg-white rounded-[40px] p-4 mb-6 shadow-2xl shadow-black/5"
      style={{
        width: width || 160, 
        marginHorizontal: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 10,
      }}
    >
      {/* IMAGE AREA */}
      <View className="h-32 w-full rounded-[32px] overflow-hidden bg-zinc-50 mb-4">
        <Image 
          source={{ uri: imageUrl }} 
          className="w-full h-full" 
          resizeMode="cover"
        />
      </View>

      {/* CONTENT AREA */}
      <View className="px-2">
        <Text className="text-black text-[15px] font-black tracking-tighter leading-5 mb-1" numberOfLines={2}>
          {title}
        </Text>
        <View className="flex-row items-center mb-4">
           {/* Placeholder for market icon if needed */}
           <Text className="text-black/30 text-[11px] font-black uppercase tracking-widest">
             {market}
           </Text>
        </View>

        {/* BOTTOM ROW */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-baseline">
            <Text className="text-black text-[10px] font-black mr-0.5">$</Text>
            <Text className="text-black text-xl font-black">{price.replace('$', '')}</Text>
          </View>
          <TouchableOpacity 
            onPress={onActionPress}
            className="w-10 h-10 rounded-full bg-[#F5F5F5] items-center justify-center border border-black/5 shadow-sm"
          >
            <Plus size={20} color="black" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
