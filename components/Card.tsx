import React from 'react';
import { View, ViewProps } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  const { isDarkMode } = useThemeStore();
  const bgClass = isDarkMode ? 'bg-dark-secondary' : 'bg-[#F0F0F0]';

  return (
    <View className={`p-4 rounded-xl shadow-sm ${bgClass} ${className}`} {...props}>
      {children}
    </View>
  );
};
