import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';
import { AuthButton } from '../../components/Auth/AuthButton';
import { Container } from '../../components/Container';
import { TrendingUp, ShieldCheck, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const WelcomeScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-white/60' : 'text-black/60';
  const accentColor = '#22C55E';

  return (
    <Container className="flex-1">
      {/* Background Decorative Grid/Pattern */}
      <View className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" pointerEvents="none">
        <View className="flex-1 flex-row flex-wrap">
          {Array.from({ length: 48 }).map((_, i) => (
            <View key={i} className="w-[33.33%] h-24 border-[0.5px] border-black dark:border-white" />
          ))}
        </View>
      </View>
      <LinearGradient 
        colors={isDarkMode ? ['transparent', '#0A0A0A'] : ['transparent', '#FFFFFF']} 
        className="absolute inset-0"
        pointerEvents="none"
      />

      <SafeAreaView className="flex-1 px-8 py-6 justify-between">
        {/* Header / Logo Section */}
        <View className="items-center mt-4">
          <View className="relative">
            {/* Glow Background */}
            <View className="absolute inset-0 blur-2xl opacity-20 scale-150 rounded-full" style={{ backgroundColor: accentColor }} />
            <View className="w-14 h-14 bg-[#22C55E]/10 rounded-2xl items-center justify-center mb-4 border-[1px] border-[#22C55E]/20">
              <TrendingUp size={28} color={accentColor} strokeWidth={2.5} />
            </View>
          </View>
          <Text className={`${textColor} text-2xl font-black tracking-tighter mb-1`}>
            TrueICT
          </Text>
          <View className="flex-row items-center">
            <Zap size={10} color={accentColor} fill={accentColor} className="mr-1.5" />
            <Text className={`${secondaryColor} text-[9px] font-black uppercase tracking-[3px]`}>
              Elite Community
            </Text>
          </View>
        </View>

        {/* Hero Section */}
        <View className="flex-1 justify-center py-6">
          <View className="bg-[#22C55E]/10 px-3 py-1 rounded-full self-start mb-3 border-[1px] border-[#22C55E]/20">
            <Text className="text-[#22C55E] text-[9px] font-black uppercase tracking-widest">Mastery Guaranteed</Text>
          </View>
          <Text className={`${textColor} text-[32px] font-black leading-[38px] mb-3`}>
            Master the Markets{"\n"}
            <Text className="text-[#22C55E]">With Elite ICT.</Text>
          </Text>
          <Text className={`${secondaryColor} text-sm font-medium leading-5 mb-6`}>
            Step into the arena with institutional-grade strategies used by the top 1% of traders.
          </Text>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-[#22C55E]/10 items-center justify-center mr-3">
              <ShieldCheck size={16} color="#22C55E" />
            </View>
            <View>
              <Text className={`${textColor} text-xs font-bold leading-tight`}>Secure & Trusted</Text>
              <Text className={`${secondaryColor} text-[9px] font-semibold uppercase tracking-widest leading-tight`}>Institutionally Audited</Text>
            </View>
          </View>
        </View>

        {/* Actions Section */}
        <View className="w-full gap-3">
          <AuthButton 
            label="Get Started" 
            variant="primary"
            onPress={() => navigation.navigate('Signup')} 
          />
          <AuthButton 
            label="Sign In" 
            variant="outline"
            onPress={() => navigation.navigate('Login')} 
          />
        </View>
      </SafeAreaView>
    </Container>
  );
};
