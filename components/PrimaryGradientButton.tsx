import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PrimaryGradientButtonProps extends TouchableOpacityProps {
  title: string;
}

export const PrimaryGradientButton: React.FC<PrimaryGradientButtonProps> = ({ 
  title, 
  className = '', 
  ...props 
}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      className={`rounded-2xl overflow-hidden ${className}`}
      {...props}
    >
      <LinearGradient
        colors={['#00FFB2', '#00D192']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="px-6 py-4 items-center justify-center"
      >
        <Text className="text-black font-extrabold text-lg uppercase tracking-widest">{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
