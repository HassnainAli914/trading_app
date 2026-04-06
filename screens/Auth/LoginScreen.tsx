import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Animated, Dimensions } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { AuthInput } from '../../components/Auth/AuthInput';
import { AuthButton } from '../../components/Auth/AuthButton';
import { SocialLogin } from '../../components/Auth/SocialLogin';
import { Container } from '../../components/Container';
import { Mail, Lock, ChevronLeft, Fingerprint, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const LoginScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Entrance animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardAnim = useRef(new Animated.Value(40)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: Platform.OS !== 'web' }),
        Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 60, useNativeDriver: Platform.OS !== 'web' }),
      ]),
      Animated.parallel([
        Animated.timing(cardOpacity, { toValue: 1, duration: 400, useNativeDriver: Platform.OS !== 'web' }),
        Animated.spring(cardAnim, { toValue: 0, friction: 8, tension: 50, useNativeDriver: Platform.OS !== 'web' }),
      ]),
    ]).start();
  }, []);

  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedColor = isDarkMode ? 'text-white/40' : 'text-black/35';

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login({ email, name: 'Trader Alex' });
      setLoading(false);
    }, 1500);
  };

  return (
    <Container className="flex-1">
      {/* Ambient Background Glow */}
      <View className="absolute top-0 left-0 right-0 h-[400px]" pointerEvents="none">
        <LinearGradient
          colors={isDarkMode
            ? ['rgba(34,197,94,0.06)', 'rgba(34,197,94,0.02)', 'transparent']
            : ['rgba(34,197,94,0.04)', 'rgba(34,197,94,0.01)', 'transparent']
          }
          className="absolute inset-0"
        />
      </View>

      {/* Subtle Grid Pattern */}
      <View className="absolute inset-0 opacity-[0.02]" pointerEvents="none">
        <View className="flex-1 flex-row flex-wrap">
          {Array.from({ length: 36 }).map((_, i) => (
            <View key={i} className={`w-[25%] h-20 border-[0.5px] ${isDarkMode ? 'border-white' : 'border-black'}`} />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          <ScrollView 
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
          >
            {/* Navigation Bar */}
            <Animated.View 
              className="flex-row items-center justify-between mb-12"
              style={{ opacity: fadeAnim }}
            >
              <TouchableOpacity 
                onPress={() => navigation.goBack()}
                className={`w-11 h-11 rounded-2xl items-center justify-center border-[1.5px] ${isDarkMode ? 'border-white/8 bg-white/[0.03]' : 'border-black/5 bg-black/[0.02]'}`}
              >
                <ChevronLeft size={20} color={isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'} />
              </TouchableOpacity>

              <View className="flex-row items-center gap-1.5 bg-[#22C55E]/8 px-3.5 py-2 rounded-xl border-[1px] border-[#22C55E]/15">
                <Fingerprint size={14} color="#22C55E" strokeWidth={2.5} />
                <Text className="text-[#22C55E] text-[9px] font-black uppercase tracking-[2px]">Secure Login</Text>
              </View>
            </Animated.View>

            {/* Hero Header */}
            <Animated.View 
              className="mb-10"
              style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            >
              <Text className={`${mutedColor} text-xs font-black uppercase tracking-[3px] mb-3`}>
                Welcome Back
              </Text>
              <Text className={`${textColor} text-[32px] font-black tracking-tight leading-[38px] mb-3`}>
                Sign in to your{'\n'}
                <Text className="text-[#22C55E]">Trading</Text> Terminal
              </Text>
              <Text className={`${isDarkMode ? 'text-white/25' : 'text-black/25'} text-sm font-medium leading-5`}>
                Access premium ICT strategies, live market analysis, and your personalized dashboard.
              </Text>
            </Animated.View>

            {/* Form Card */}
            <Animated.View 
              className={`p-6 rounded-[28px] border-[1px] mb-6 ${isDarkMode ? 'bg-[#141414] border-white/[0.06]' : 'bg-white border-black/[0.04]'}`}
              style={[
                { opacity: cardOpacity, transform: [{ translateY: cardAnim }] },
                !isDarkMode ? {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 16 },
                  shadowOpacity: 0.04,
                  shadowRadius: 24,
                  elevation: 8,
                } : {}
              ]}
            >
              <AuthInput 
                label="Email"
                placeholder="name@company.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                textContentType="username"
                autoComplete="username"
                icon={Mail}
              />
              <AuthInput 
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType="password"
                autoComplete="password"
                icon={Lock}
                className="mb-2"
              />

              <TouchableOpacity className="self-end mb-6">
                <Text className="text-[#22C55E] text-[10px] font-black uppercase tracking-[1.5px]">
                  Reset Password
                </Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity 
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.85}
                className="w-full h-[56px] rounded-2xl items-center justify-center flex-row overflow-hidden"
              >
                <LinearGradient
                  colors={['#22C55E', '#16A34A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="absolute inset-0"
                />
                {loading ? (
                  <Text className="text-white font-bold text-sm">Authenticating...</Text>
                ) : (
                  <View className="flex-row items-center">
                    <Text className="text-white font-black text-[15px] tracking-tight mr-2">Sign In</Text>
                    <ArrowRight size={18} color="white" strokeWidth={3} />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Divider & Social */}
            <Animated.View style={{ opacity: cardOpacity }}>
              <SocialLogin onGooglePress={() => {}} className="mb-8" />
            </Animated.View>

            {/* Footer */}
            <Animated.View 
              className="flex-row justify-center items-center"
              style={{ opacity: cardOpacity }}
            >
              <Text className={`${isDarkMode ? 'text-white/20' : 'text-black/20'} text-sm font-medium mr-1.5`}>
                New to the platform?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text className="text-[#22C55E] text-sm font-black">
                  Create Account
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Container>
  );
};
