import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Animated, Dimensions } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { AuthInput } from '../../components/Auth/AuthInput';
import { Container } from '../../components/Container';
import { User, Mail, Lock, ChevronLeft, UserPlus, ArrowRight, CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const SignupScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const { login } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Entrance animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardAnim = useRef(new Animated.Value(40)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const benefitsAnim = useRef(new Animated.Value(20)).current;
  const benefitsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: Platform.OS !== 'web' }),
        Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 60, useNativeDriver: Platform.OS !== 'web' }),
      ]),
      Animated.parallel([
        Animated.timing(cardOpacity, { toValue: 1, duration: 400, useNativeDriver: Platform.OS !== 'web' }),
        Animated.spring(cardAnim, { toValue: 0, friction: 8, tension: 50, useNativeDriver: Platform.OS !== 'web' }),
      ]),
      Animated.parallel([
        Animated.timing(benefitsOpacity, { toValue: 1, duration: 350, useNativeDriver: Platform.OS !== 'web' }),
        Animated.spring(benefitsAnim, { toValue: 0, friction: 8, tension: 50, useNativeDriver: Platform.OS !== 'web' }),
      ]),
    ]).start();
  }, []);

  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedColor = isDarkMode ? 'text-white/40' : 'text-black/35';

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      login({ email, name });
      setLoading(false);
    }, 1500);
  };

  const benefits = [
    'Access 50+ premium ICT strategies',
    'Live market signals & alerts',
    'Exclusive trading community access',
  ];

  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const passwordError = confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords do not match' : '';

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
              className="flex-row items-center justify-between mb-10"
              style={{ opacity: fadeAnim }}
            >
              <TouchableOpacity 
                onPress={() => navigation.goBack()}
                className={`w-11 h-11 rounded-2xl items-center justify-center border-[1.5px] ${isDarkMode ? 'border-white/8 bg-white/[0.03]' : 'border-black/5 bg-black/[0.02]'}`}
              >
                <ChevronLeft size={20} color={isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'} />
              </TouchableOpacity>

              <View className="flex-row items-center gap-1.5 bg-[#22C55E]/8 px-3.5 py-2 rounded-xl border-[1px] border-[#22C55E]/15">
                <UserPlus size={14} color="#22C55E" strokeWidth={2.5} />
                <Text className="text-[#22C55E] text-[9px] font-black uppercase tracking-[2px]">Join Now</Text>
              </View>
            </Animated.View>

            {/* Hero Header */}
            <Animated.View 
              className="mb-8"
              style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            >
              <Text className={`${mutedColor} text-xs font-black uppercase tracking-[3px] mb-3`}>
                Get Started
              </Text>
              <Text className={`${textColor} text-[32px] font-black tracking-tight leading-[38px] mb-3`}>
                Create your{'\n'}
                <Text className="text-[#22C55E]">TrueICT</Text> Account
              </Text>
              <Text className={`${isDarkMode ? 'text-white/25' : 'text-black/25'} text-sm font-medium leading-5`}>
                Start your journey to mastering institutional trading concepts.
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
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
                textContentType="name"
                autoComplete="name"
                icon={User}
              />
              <AuthInput 
                label="Email"
                placeholder="name@company.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                icon={Mail}
              />
              <AuthInput 
                label="Password"
                placeholder="Min. 8 characters"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType="newPassword"
                autoComplete="new-password"
                icon={Lock}
              />
              <AuthInput 
                label="Confirm Password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                textContentType="newPassword"
                autoComplete="new-password"
                icon={Lock}
                error={passwordError}
                className="mb-6"
              />

              {/* Create Account Button */}
              <TouchableOpacity 
                onPress={handleSignup}
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
                  <Text className="text-white font-bold text-sm">Creating Account...</Text>
                ) : (
                  <View className="flex-row items-center">
                    <Text className="text-white font-black text-[15px] tracking-tight mr-2">Create Account</Text>
                    <ArrowRight size={18} color="white" strokeWidth={3} />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Benefits Strip */}
            <Animated.View 
              className={`p-5 rounded-2xl border-[1px] mb-8 ${isDarkMode ? 'bg-[#141414]/60 border-white/[0.04]' : 'bg-gray-50 border-black/[0.03]'}`}
              style={{ opacity: benefitsOpacity, transform: [{ translateY: benefitsAnim }] }}
            >
              <Text className={`${mutedColor} text-[9px] font-black uppercase tracking-[2px] mb-3`}>
                What You'll Get
              </Text>
              {benefits.map((benefit, i) => (
                <View key={i} className="flex-row items-center mb-2 last:mb-0">
                  <CheckCircle size={14} color="#22C55E" strokeWidth={2.5} />
                  <Text className={`${isDarkMode ? 'text-white/50' : 'text-black/40'} text-[12px] font-semibold ml-2.5`}>
                    {benefit}
                  </Text>
                </View>
              ))}
            </Animated.View>

            {/* Footer */}
            <Animated.View 
              className="flex-row justify-center items-center"
              style={{ opacity: benefitsOpacity }}
            >
              <Text className={`${isDarkMode ? 'text-white/20' : 'text-black/20'} text-sm font-medium mr-1.5`}>
                Already a member?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-[#22C55E] text-sm font-black">
                  Sign In
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Container>
  );
};
