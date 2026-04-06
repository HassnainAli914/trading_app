import React from 'react';
import { View, Text } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface PaymentCardProps {
  courseName: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Pending';
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ 
  courseName, 
  amount, 
  date, 
  status 
}) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-white/40' : 'text-black/40';
  const cardBg = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white';
  const statusBg = status === 'Paid' ? 'bg-white' : 'bg-white/10';
  const statusTextColor = status === 'Paid' ? 'text-black' : 'text-white/30';

  return (
    <View className={`p-6 rounded-[28px] mb-4 flex-row justify-between items-center border border-white/5 shadow-sm ${cardBg}`}>
      <View className="flex-1 mr-6">
        <Text className={`${textColor} font-black text-lg tracking-tighter mb-1`} numberOfLines={1}>{courseName}</Text>
        <Text className={`${secondaryColor} text-[10px] font-black uppercase tracking-[2px]`}>{date}</Text>
      </View>
      
      <View className="items-end">
        <Text className={`${textColor} font-black text-xl mb-2 tracking-tight`}>{amount}</Text>
        <View className={`px-4 py-1.5 rounded-full border border-white/10 ${statusBg}`}>
          <Text className={`text-[10px] font-black uppercase tracking-widest ${statusTextColor}`}>{status}</Text>
        </View>
      </View>
    </View>
  );
};
