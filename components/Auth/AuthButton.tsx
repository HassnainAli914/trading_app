import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';

interface AuthButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ 
  label, 
  onPress, 
  loading, 
  variant = 'primary',
  className = ''
}) => {
  const { isDarkMode } = useThemeStore();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return isDarkMode ? 'bg-white' : 'bg-black';
      case 'secondary':
        return 'bg-[#22C55E]';
      case 'outline':
        return `border-[1.5px] ${isDarkMode ? 'border-white/20' : 'border-black/10'}`;
      default:
        return isDarkMode ? 'bg-white' : 'bg-black';
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') return isDarkMode ? 'text-white' : 'text-black';
    if (variant === 'secondary') return 'text-white';
    return isDarkMode ? 'text-black' : 'text-white';
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
      className={`w-full h-14 rounded-2xl items-center justify-center ${getVariantStyles()} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? (isDarkMode ? 'black' : 'white') : 'white'} />
      ) : (
        <Text className={`text-base font-bold tracking-tight ${getTextColor()}`}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
