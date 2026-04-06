import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ConversationHeaderProps {
  name: string;
  status: string;
  avatarUrl: string;
  onBack: () => void;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({ 
  name, 
  status, 
  avatarUrl, 
  onBack 
}) => {
  const { isDarkMode } = useThemeStore();
  // FORCE DARK MODE for navigation components
  const textColor = 'text-white';
  const secondaryColor = 'text-[#888888]';
  const headerBg = 'bg-[#121212]';

  return (
    <SafeAreaView edges={['top']} className={`${headerBg} border-b border-white/5`}>
      <View className="flex-row items-center px-4 py-3">
        {/* Back Button */}
        <TouchableOpacity onPress={onBack} className="p-2 rounded-xl border-[1px] bg-white/10 border-white/5 mr-3">
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>

        {/* User Info */}
        <View className="flex-row items-center flex-1">
          <Image 
            source={{ uri: avatarUrl }} 
            className="w-10 h-10 rounded-full mr-3 border border-[#00FFB2]/20" 
          />
          <View>
            <Text className={`${textColor} font-bold text-base`} numberOfLines={1}>{name}</Text>
            <View className="flex-row items-center">
              {status === 'Online' && (
                <View className="w-2 h-2 rounded-full bg-[#00FFB2] mr-1.5" />
              )}
              <Text className={`${secondaryColor} text-xs`}>{status}</Text>
            </View>
          </View>
        </View>

        {/* Action Icons */}
        <View className="flex-row items-center">
          <TouchableOpacity className="p-2 rounded-xl border-[1px] bg-white/10 border-white/5 ml-3">
            <Ionicons name="call-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 rounded-xl border-[1px] bg-white/10 border-white/5 ml-3">
            <Ionicons name="videocam-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 rounded-xl border-[1px] bg-white/10 border-white/5 ml-3">
            <Ionicons name="information-circle-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
