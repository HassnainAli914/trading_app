/// <reference types="nativewind/types" />
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface PromoCardProps {
  className?: string;
}

export const PromoCard: React.FC<PromoCardProps> = ({ className = '' }) => {
  return (
    <TouchableOpacity className={`overflow-hidden rounded-[40px] border border-white/5 shadow-2xl ${className}`}>
      <LinearGradient
        colors={['#1C1C1E', '#000000']}
        className="p-10"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-row justify-between items-start mb-8">
          <View className="bg-white/10 p-3 rounded-2xl border border-white/5">
            <Ionicons name="sparkles" size={24} color="white" />
          </View>
          <View className="bg-white px-4 py-1.5 rounded-full">
            <Text className="text-black text-[10px] font-black uppercase tracking-widest">Limited</Text>
          </View>
        </View>
        <Text className="text-white font-black text-3xl leading-9 tracking-tighter">Unlock Live Trading Signals</Text>
        <Text className="text-white/40 text-sm font-medium mt-3 mb-10 leading-6">Elevate your game with institutional insights and real-time market execution.</Text>
        <TouchableOpacity className="bg-white h-16 rounded-full items-center justify-center shadow-2xl shadow-white/10">
          <Text className="text-black font-black text-sm uppercase tracking-widest">Get Early Access</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
};
