import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore, UserTier } from '../store/useAuthStore';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Check, ChevronLeft, Crown, Zap, Shield, 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: UserTier;
  name: string;
  price: string;
  billing: string;
  description: string;
  features: PlanFeature[];
  color: string;
  gradient: [string, string, string];
  icon: any;
  popular?: boolean;
}

const PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Learner',
    price: '$0',
    billing: 'forever',
    description: 'Perfect for beginners starting their trading journey.',
    features: [
      { text: 'Access to 10+ basic lessons', included: true },
      { text: 'Community chat access', included: true },
      { text: 'Basic lot size calculators', included: true },
      { text: 'Pro ICT Trading Tools', included: false },
      { text: 'XAUUSD AI Analyzer', included: false },
      { text: 'Assignments & Feedback', included: false },
    ],
    color: '#FFFFFF',
    gradient: ['#1A1A1A', '#0D0D0D', '#000000'],
    icon: Shield,
  },
  {
    id: 'pro',
    name: 'Pro Trader',
    price: '$29',
    billing: 'per month',
    description: 'Most popular for serious ICT students.',
    popular: true,
    features: [
      { text: 'Unlock all 50+ lessons', included: true },
      { text: 'Full Trading Tools Suite', included: true },
      { text: 'Real-time market signals', included: true },
      { text: 'Assignments & Mentor Feedback', included: true },
      { text: 'XAUUSD AI Analyzer', included: false },
      { text: 'Priority Performance Support', included: false },
    ],
    color: '#FFFFFF',
    gradient: ['#2A2A2A', '#1A1A1A', '#000000'],
    icon: Zap,
  },
  {
    id: 'premium',
    name: 'Elite Institutional',
    price: '$59',
    billing: 'per month',
    description: 'The ultimate terminal for elite performers.',
    features: [
      { text: 'Everything in Pro plan', included: true },
      { text: 'Full AI Terminal Access', included: true },
      { text: 'XAUUSD AI Market Analyzer', included: true },
      { text: '1-on-1 Strategy Reviews', included: true },
      { text: 'Advanced Portfolio Analytics', included: true },
      { text: 'Priority Lifetime Support', included: true },
    ],
    color: '#000000',
    gradient: ['#FFFFFF', '#F0F0F0', '#E0E0E0'],
    icon: Crown,
  },
];

const PlanCard = ({ plan, currentTier, isDarkMode, onUpgrade }: { 
  plan: PricingPlan; 
  currentTier: UserTier; 
  isDarkMode: boolean;
  onUpgrade: (tier: UserTier) => void;
}) => {
  const isCurrent = currentTier === plan.id;
  const isElite = plan.id === 'premium';
  const isPro = plan.id === 'pro';

  const activeGradient = plan.gradient;
  const IconComp = plan.icon;
  const contentColor = isElite ? 'text-black' : 'text-white';
  const secondaryColor = isElite ? 'text-black/40' : 'text-white/40';

  return (
    <View 
      className={`rounded-[48px] overflow-hidden border mb-10 ${
        isCurrent ? 'border-white/20' : 'border-white/5'
      }`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
        elevation: 10,
      }}
    >
      <LinearGradient
        colors={activeGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-10"
      >
        <View className="flex-row justify-between items-start mb-10">
          <View className={`w-16 h-16 rounded-[24px] items-center justify-center ${isElite ? 'bg-black/5' : 'bg-white/10'} border border-black/5`}>
            <IconComp size={32} color={isElite ? 'black' : 'white'} strokeWidth={1.5} />
          </View>
          {plan.popular && (
            <View className="bg-white px-5 py-2 rounded-full shadow-2xl shadow-black/10">
              <Text className="text-black text-[10px] font-black uppercase tracking-[2px]">Core Choice</Text>
            </View>
          )}
          {isCurrent && (
            <View className={`flex-row items-center ${isElite ? 'bg-black/5' : 'bg-white/10'} px-5 py-2 rounded-full border border-black/5`}>
              <CheckCircle2 size={12} color={isElite ? 'black' : 'white'} strokeWidth={2.5} className="mr-2" />
              <Text className={`${isElite ? 'text-black' : 'text-white'} text-[10px] font-black uppercase tracking-widest`}>Current</Text>
            </View>
          )}
        </View>

        <Text className={`text-[32px] font-black tracking-tighter ${contentColor}`}>
          {plan.name}
        </Text>
        <Text className={`text-[14px] font-medium leading-6 mt-3 mb-10 ${secondaryColor}`}>
          {plan.description}
        </Text>

        <View className="flex-row items-end mb-12">
          <Text className={`text-6xl font-black tracking-tight ${contentColor}`}>
            {plan.price}
          </Text>
          <Text className={`text-base font-bold mb-3 ml-2 ${isElite ? 'text-black/20' : 'text-white/20'}`}>
            / {plan.billing}
          </Text>
        </View>

        <View className={`h-[1px] w-full mb-12 ${isElite ? 'bg-black/5' : 'bg-white/5'}`} />

        <View className="gap-6 mb-12">
          {plan.features.map((feature, i) => (
            <View key={i} className="flex-row items-center">
              <View className={`w-6 h-6 rounded-full items-center justify-center ${
                feature.included ? (isElite ? 'bg-black/5' : 'bg-white/10') : 'bg-black/5'
              }`}>
                {feature.included ? (
                  <Check size={14} color={isElite ? 'black' : 'white'} strokeWidth={3} />
                ) : (
                  <View className="w-2 h-[2px] bg-black/10 rounded-full" />
                )}
              </View>
              <Text className={`ml-4 text-[14px] font-black tracking-tight ${
                feature.included 
                  ? contentColor 
                  : (isElite ? 'text-black/10' : 'text-white/10')
              }`}>
                {feature.text}
              </Text>
            </View>
          ))}
        </View>

        {!isCurrent ? (
          <TouchableOpacity 
            onPress={() => onUpgrade(plan.id)}
            className={`w-full h-16 rounded-full flex-row items-center justify-center shadow-2xl ${isElite ? 'bg-black' : 'bg-white'}`}
            activeOpacity={0.9}
          >
            <Text className={`text-sm font-black uppercase tracking-widest mr-3 ${isElite ? 'text-white' : 'text-black'}`}>
              Select {plan.name.split(' ')[0]}
            </Text>
            <ArrowRight size={18} color={isElite ? 'white' : 'black'} strokeWidth={2.5} />
          </TouchableOpacity>
        ) : (
          <View className={`w-full h-16 rounded-full items-center justify-center border border-black/10 ${isElite ? 'bg-black/5' : 'bg-white/5'}`}>
            <Text className={`text-sm font-black uppercase tracking-widest ${isElite ? 'text-black/20' : 'text-white/20'}`}>
              Active Plan
            </Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

export const SubscriptionScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const { tier, updateTier } = useAuthStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleUpgrade = (newTier: UserTier) => {
    updateTier(newTier);
    console.log(`Upgraded to ${newTier}`);
  };

  return (
    <Container className="flex-1 bg-black">
      <Header
        title="Academy Plans"
        subtitle="Upgrade your edge"
        leftControl={
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="p-3 rounded-2xl bg-white/5 border border-white/5"
          >
            <ChevronLeft size={20} color="white" />
          </TouchableOpacity>
        }
        showSidebarTrigger={false}
      />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 30, paddingBottom: 100 }}
      >
        {/* Billing Toggle */}
        <View className="flex-row self-center bg-white/5 p-1 rounded-full mb-14 border border-white/5">
          <TouchableOpacity 
            onPress={() => setBillingCycle('monthly')}
            className={`px-8 py-3 rounded-full ${billingCycle === 'monthly' ? 'bg-white' : ''}`}
          >
            <Text className={`text-xs font-black uppercase tracking-widest ${billingCycle === 'monthly' ? 'text-black' : 'text-white/30'}`}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setBillingCycle('yearly')}
            className={`px-8 py-3 rounded-full ${billingCycle === 'yearly' ? 'bg-white' : ''}`}
          >
             <View className="flex-row items-center">
              <Text className={`text-xs font-black uppercase tracking-widest ${billingCycle === 'yearly' ? 'text-black' : 'text-white/30'}`}>Yearly</Text>
              <View className="bg-white/10 px-2 py-0.5 rounded-md ml-2">
                <Text className="text-white text-[8px] font-black">-20%</Text>
              </View>
             </View>
          </TouchableOpacity>
        </View>

        {/* Pricing Cards */}
        {PLANS.map(plan => (
          <PlanCard 
            key={plan.id} 
            plan={plan} 
            currentTier={tier} 
            isDarkMode={isDarkMode}
            onUpgrade={handleUpgrade}
          />
        ))}

        {/* Support Section */}
        <View className="mt-10 p-10 rounded-[48px] bg-white/5 border border-white/5 items-center">
           <ShieldCheck size={40} color="white" strokeWidth={1} className="mb-6 opacity-30" />
           <Text className={`text-xl font-black mb-3 tracking-tight text-white`}>Institutional Security</Text>
           <Text className={`text-[13px] font-medium text-center leading-6 mb-8 text-white/30`}>
             Every transaction is secured with institutional-grade SSL encryption. Cancel or modify your plan at any time with one click.
           </Text>
           <TouchableOpacity className="flex-row items-center border-b border-white/20 pb-1">
             <Text className="text-white text-xs font-black uppercase tracking-widest">Billing Support</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};
