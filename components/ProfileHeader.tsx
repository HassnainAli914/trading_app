import React from 'react';
import { View, Text, Image } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl: string;
  stats: {
    courses: number;
    completed: number;
    progress: string;
  };
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  name, 
  email, 
  avatarUrl, 
  stats 
}) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-white/40' : 'text-black/40';
  const cardBg = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F9F9F9]';

  return (
    <View className="px-6 pt-10 pb-6">
      {/* Horizontal Identity Row */}
      <View className="flex-row items-center mb-10">
        {/* Avatar */}
        <View className="mr-6">
          <View className="w-24 h-24 rounded-full border-[1px] border-white/20 p-1.5 bg-zinc-900 shadow-2xl">
            <Image 
              source={{ uri: avatarUrl }} 
              className="w-full h-full rounded-full bg-zinc-800" 
            />
            <View className="absolute bottom-1 right-1 w-6 h-6 bg-white border-4 border-black rounded-full" />
          </View>
        </View>

        {/* Name and Email */}
        <View className="flex-1 justify-center">
          <Text className={`${textColor} text-3xl font-black tracking-tighter mb-1`}>{name}</Text>
          <Text className={`${secondaryColor} text-[11px] font-black uppercase tracking-[3px]`}>{email}</Text>
        </View>
      </View>

      {/* Stats Chips */}
      <View className="flex-row justify-between w-full gap-4">
        <StatItem label="Enrolled" value={stats.courses} bg={cardBg} text={textColor} />
        <StatItem label="Finished" value={stats.completed} bg={cardBg} text={textColor} />
        <StatItem label="Progress" value={stats.progress} bg={cardBg} text={textColor} />
      </View>
    </View>
  );
};

const StatItem = ({ label, value, bg, text }: any) => (
  <View className={`flex-1 p-5 rounded-[28px] items-center border border-white/5 shadow-xl ${bg}`}>
    <Text className={`${text} text-xl font-black mb-1 tracking-tight`}>{value}</Text>
    <Text className="text-white/20 text-[9px] font-black uppercase tracking-[3px]">{label}</Text>
  </View>
);
