import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';

interface SocialLoginProps {
  onGooglePress: () => void;
  dividerLabel?: string;
  className?: string;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ 
  onGooglePress, 
  dividerLabel = 'or continue with',
  className = ''
}) => {
  const { isDarkMode } = useThemeStore();

  const getBorderColor = () => (isDarkMode ? 'border-white/10' : 'border-black/5');
  const getTextColor = () => (isDarkMode ? 'text-white/40' : 'text-black/40');
  const getCardBg = () => (isDarkMode ? 'bg-[#121212]' : 'bg-white');

  return (
    <View className={`w-full ${className}`}>
      {/* Divider */}
      <View className="flex-row items-center mb-6">
        <View className={`flex-1 h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />
        <Text className={`mx-4 text-[10px] font-bold uppercase tracking-widest ${getTextColor()}`}>
          {dividerLabel}
        </Text>
        <View className={`flex-1 h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`} />
      </View>

      {/* Google Button */}
      <TouchableOpacity 
        onPress={onGooglePress}
        activeOpacity={0.7}
        className={`w-full h-14 rounded-2xl items-center justify-center flex-row border-[1.5px] ${getBorderColor()} ${getCardBg()}`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: isDarkMode ? 0 : 0.03,
          shadowRadius: 4,
          elevation: isDarkMode ? 0 : 2,
        }}
      >
         <Image 
          source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} 
          className="w-5 h-5 mr-3" 
        />
        <Text className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};
