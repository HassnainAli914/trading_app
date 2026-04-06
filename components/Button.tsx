import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ title, className = '', ...props }) => {
  const { isDarkMode } = useThemeStore();
  const bgClass = 'bg-[#00FFB2]'; // The accent color is always green
  const textClass = isDarkMode ? 'text-dark-primary' : 'text-light-primary'; // Primary text on accent

  return (
    <TouchableOpacity 
      className={`px-4 py-3 rounded-lg flex items-center justify-center ${bgClass} ${className}`} 
      {...props}
    >
      <Text className={`font-bold ${textClass}`}>{title}</Text>
    </TouchableOpacity>
  );
};
