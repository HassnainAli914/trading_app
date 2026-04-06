import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface CourseHeaderProps {
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  students: string;
  onBack: () => void;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ 
  title, 
  description, 
  imageUrl, 
  rating, 
  students, 
  onBack 
}) => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <View className="h-80 w-full relative">
      <ImageBackground 
        source={{ uri: imageUrl }} 
        className="w-full h-full"
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
          className="w-full h-full justify-end px-4 pb-6"
        >
          {/* Back Button */}
          <TouchableOpacity 
            onPress={onBack}
            className="absolute top-12 left-4 p-2 rounded-xl bg-black/40 items-center justify-center border border-white/20"
          >
            <Ionicons name="chevron-back" size={20} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-2xl font-bold mb-2">{title}</Text>
          <Text className="text-gray-300 text-sm mb-4" numberOfLines={2}>{description}</Text>
          
          <View className="flex-row items-center">
            <View className="flex-row items-center mr-6">
              <Ionicons name="star" size={16} color="#00FFB2" />
              <Text className="text-white font-bold ml-1">{rating}</Text>
              <Text className="text-gray-400 text-xs ml-1">(4.8k reviews)</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="people" size={16} color="#00FFB2" />
              <Text className="text-white font-bold ml-1">{students}</Text>
              <Text className="text-gray-400 text-xs ml-1">students</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
