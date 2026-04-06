/// <reference types="nativewind/types" />
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../store/useThemeStore';
import { PanelLeftOpen } from 'lucide-react-native';

interface HeaderProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  leftControl?: React.ReactNode;
  rightControl?: React.ReactNode;
  centerControl?: React.ReactNode;
  onLeftPress?: () => void;
  showSidebarTrigger?: boolean;
  transparent?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftControl,
  rightControl,
  centerControl,
  onLeftPress,
  showSidebarTrigger = true,
  transparent = false,
  className = '',
}) => {
  // FORCE DARK MODE for navigation components
  const textColor = 'text-white';
  const subtitleColor = 'text-white/40';
  
  return (
    <View className={`w-full overflow-hidden ${transparent ? 'bg-transparent' : 'bg-[#000000]'} ${className}`}>
      <SafeAreaView edges={['top']} className="pb-0">
        <View className="flex-row items-center justify-between h-16 px-6">
          {/* LEFT SECTION */}
          <View className="flex-row items-center flex-1">
            {showSidebarTrigger ? (
              <TouchableOpacity 
                onPress={onLeftPress}
                className="p-2.5 rounded-2xl bg-white/5 border border-white/5 mr-3"
                activeOpacity={0.7}
              >
                <PanelLeftOpen 
                  size={20} 
                  color="white"
                  strokeWidth={2} 
                />
              </TouchableOpacity>
            ) : leftControl}
            
            {!centerControl && title && (
              <View className="justify-center">
                {subtitle && (
                  <Text className={`${subtitleColor} text-[10px] font-black uppercase tracking-[2px] mb-0.5`}>
                    {subtitle}
                  </Text>
                )}
                {typeof title === 'string' ? (
                  <Text className={`${textColor} text-2xl font-black tracking-tight leading-7`}>
                    {title}
                  </Text>
                ) : (
                  title
                )}
              </View>
            )}
          </View>

          {/* CENTER SECTION (Optional for search, etc) */}
          {centerControl && (
            <View className="flex-[4] px-1 items-center justify-center">
              {centerControl}
            </View>
          )}

          {/* RIGHT SECTION */}
          <View className="flex-1 items-end">
            {rightControl}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
