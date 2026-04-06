import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  imageUrl: string;
  progress: number;
  category: string;
  onPress: () => void;
  rating?: number;
  isTrending?: boolean;
  layout?: 'grid' | 'list';
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  instructor, 
  imageUrl, 
  progress, 
  category,
  onPress, 
  rating = 4.8,
  isTrending = false,
  layout = 'list',
  className = '' 
}) => {
  const { isDarkMode } = useThemeStore();
  const isGrid = layout === 'grid';
  
  // Restored previous color palette as requested
  const bgClass = isDarkMode ? 'bg-[#0C0C0C]' : 'bg-[#F9F9F9]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-[#A0A0A0]' : 'text-[#555555]';

  if (isGrid) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.9}
        className={`rounded-[32px] overflow-hidden mb-4 border-[1px] ${isDarkMode ? 'border-white/5' : 'border-black/5'} ${bgClass} ${className}`}
        style={{ width: (width - 48) / 2 }}
      >
        <View className="relative h-28 w-full">
          <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
          {isTrending && (
             <View className="absolute top-3 left-3 bg-white px-2 py-0.5 rounded-full">
                <Text className="text-[7px] font-black uppercase text-black tracking-widest text-center">Trending</Text>
             </View>
          )}
        </View>

        <View className="p-4">
          <Text className={`${textColor} font-bold text-[13px] leading-4 mb-2`} numberOfLines={2}>
            {title}
          </Text>
          
          <View className="flex-row items-center justify-between mb-3">
            <Text className={`${secondaryColor} text-[9px] font-bold`} numberOfLines={1}>
               {instructor}
            </Text>
            <View className="flex-row items-center">
               <Star size={9} color="#FFFFFF" fill="#FFFFFF" />
               <Text className={`${textColor} text-[9px] font-black ml-0.5`}>{rating}</Text>
            </View>
          </View>

          <View className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
             <View className="h-full bg-white" style={{ width: `${progress}%` }} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Restored previous horizontal list layout as requested
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      className={`rounded-[28px] p-4 mb-4 flex-row items-center border border-transparent dark:border-white/5 ${bgClass} ${className}`}
    >
      {/* Thumbnail */}
      <View className="w-20 h-20 rounded-2xl overflow-hidden mr-4 bg-gray-200 dark:bg-gray-800">
        <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
      </View>

      {/* Info */}
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <View className="flex-row items-center">
            <Text className="text-white text-[10px] font-bold uppercase tracking-wider mr-2">{category}</Text>
            {isTrending && (
              <View className="bg-white px-2 py-0.5 rounded-full">
                <Text className="text-black text-[7px] font-black uppercase">Trending</Text>
              </View>
            )}
          </View>
          <Text className={`${secondaryColor} text-[10px] font-medium`}>{progress}%</Text>
        </View>
        
        <Text className={`${textColor} font-bold text-base mb-1`} numberOfLines={1}>
          {title}
        </Text>
        
        <View className="flex-row items-center justify-between mb-3">
          <Text className={`${secondaryColor} text-xs`}>By {instructor}</Text>
          <View className="flex-row items-center">
             <Star size={11} color="#FFFFFF" fill="#FFFFFF" />
             <Text className={`${textColor} text-[11px] font-bold ml-1`}>{rating}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
          <View 
            className="h-full bg-white" 
            style={{ width: `${progress}%` }} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
