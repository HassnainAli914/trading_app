/// <reference types="nativewind/types" />
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

interface DrawerItemProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isActive: boolean;
  onPress: () => void;
}

export const DrawerItem: React.FC<DrawerItemProps> = ({
  label,
  icon,
  isActive,
  onPress
}) => {
  // FORCE DARK MODE for navigation components
  const textColor = isActive ? 'text-white' : 'text-gray-400';
  const bgClass = isActive ? 'bg-white/5' : 'bg-transparent';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`flex-row items-center px-4 py-0.5 rounded-2xl relative overflow-hidden ${bgClass}`}
    >
      {/* Active Indicator Line */}
      {isActive && (
        <View className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#00FFB2] rounded-r-full" />
      )}

      <View className={`w-8 h-8 rounded-xl items-center justify-center mr-3 ${isActive ? 'bg-[#00FFB2]/10' : 'bg-transparent'}`}>
        <Ionicons
          name={icon}
          size={18}
          color={isActive ? '#00FFB2' : '#888'}
        />
      </View>

      <Text className={`font-bold text-[15px] flex-1 ${textColor}`}>{label}</Text>

      {isActive && (
        <Ionicons name="chevron-forward" size={16} color="#555" />
      )}
    </TouchableOpacity>
  );
};
