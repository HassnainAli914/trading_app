import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanelLeftOpen } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

interface HomeHeaderProps {
  userName: string;
  avatarUrl?: string;
  welcomeMessage?: string;
  onMenuPress?: () => void;
  onProfilePress?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName,
  avatarUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  welcomeMessage = "Welcome to TrueICT",
  onMenuPress,
  onProfilePress,
}) => {
  return (
    <View className="relative overflow-hidden rounded-b-[40px] shadow-2xl border-b border-white/10" style={{ backgroundColor: 'rgba(28, 28, 30, 0.9)' }}>
      <BlurView 
        intensity={80} 
        tint="dark" 
        className="px-6 pt-10 pb-8 bg-transparent"
      >
        <SafeAreaView edges={['top']}>
          {/* TOP ROW: LIQUID GLASSY IDENTITY */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              {/* SIDEBAR TRIGGER */}
              <TouchableOpacity 
                onPress={onMenuPress}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 mr-4"
                activeOpacity={0.7}
              >
                <PanelLeftOpen size={18} color="white" strokeWidth={2.5} />
              </TouchableOpacity>

              <View>
                <Text className="text-white text-[22px] font-black tracking-tight mb-0.5">
                  Hello, {userName}
                </Text>
                <Text className="text-white/40 text-[11px] font-bold tracking-tight uppercase">
                  {welcomeMessage}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              activeOpacity={0.9}
              className="relative"
              onPress={onProfilePress}
            >
              <Image 
                source={{ uri: avatarUrl }} 
                className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-white/20 shadow-2xl"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
};
