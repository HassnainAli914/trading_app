import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput, Platform } from 'react-native';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore, UserTier } from '../store/useAuthStore';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Calculator, Target, Calendar, Bot, BookMarked,
  TrendingUp, Bitcoin, ShieldAlert, Sparkles,
  Lock, ArrowRight, ChevronLeft, Crown,
  BarChart3, Percent, Globe, Zap, PieChart, FileBarChart,
  Search, X, Activity, LineChart
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// --- Types ---
type Tier = UserTier;

interface Tool {
  id: string;
  name: string;
  description: string;
  tier: Tier;
  category: string;
  icon: any;
  featured?: boolean;
}

// --- Category Config ---
const CATEGORIES = [
  { key: 'all', label: 'All Tools', icon: Sparkles },
  { key: 'forex', label: 'Forex', icon: TrendingUp },
  { key: 'crypto', label: 'Crypto', icon: Bitcoin },
  { key: 'risk', label: 'Risk Mgmt', icon: ShieldAlert },
  { key: 'ai', label: 'AI Tools', icon: Bot },
];

// --- Tier Config ---
const TIER_CONFIG: Record<Tier, { label: string; color: string; bgColor: string }> = {
  free: { label: 'Free', color: '#FFFFFF', bgColor: 'bg-white/10' },
  pro: { label: 'Pro', color: '#FFFFFF', bgColor: 'bg-white/20' },
  premium: { label: 'Premium', color: '#000000', bgColor: 'bg-white' },
};

const TIER_RANK: Record<Tier, number> = { free: 0, pro: 1, premium: 2 };

// --- Tools Data ---
const TOOLS: Tool[] = [
  { id: '1', name: 'XAUUSD AI Analyzer', description: 'AI-powered gold market analysis with entry/exit signals and risk assessment', tier: 'premium', category: 'ai', icon: Bot, featured: true },
  { id: '2', name: 'Lot Size Calculator', description: 'Calculate perfect lot size based on risk percentage and stop loss', tier: 'free', category: 'forex', icon: Calculator },
  { id: '3', name: 'Risk/Reward Calculator', description: 'Visualize and calculate R:R ratio for any trade setup', tier: 'free', category: 'risk', icon: Target },
  { id: '4', name: 'Economic Calendar', description: 'Track high-impact news events affecting forex and commodity markets', tier: 'free', category: 'forex', icon: Calendar },
  { id: '5', name: 'Trade Journal', description: 'Log, review and analyze your trading performance over time', tier: 'pro', category: 'risk', icon: BookMarked },
  { id: '6', name: 'Crypto Heatmap', description: 'Real-time visualization of crypto market sectors and momentum', tier: 'pro', category: 'crypto', icon: PieChart },
  { id: '7', name: 'Position Size Pro', description: 'Advanced position sizing with multi-pair correlation analysis', tier: 'pro', category: 'risk', icon: BarChart3 },
  { id: '8', name: 'Pip Value Calculator', description: 'Instantly calculate pip values for any currency pair and lot size', tier: 'free', category: 'forex', icon: Percent },
  { id: '9', name: 'Sentiment Scanner', description: 'AI-driven market sentiment analysis across social and news feeds', tier: 'premium', category: 'ai', icon: Zap },
  { id: '10', name: 'DeFi Yield Tracker', description: 'Monitor and compare DeFi yields across multiple protocols', tier: 'premium', category: 'crypto', icon: Globe },
  { id: '11', name: 'Drawdown Analyzer', description: 'Track maximum drawdown and recovery periods in your portfolio', tier: 'pro', category: 'risk', icon: FileBarChart },
  { id: '12', name: 'AI Trade Copier', description: 'Copy institutional-grade trades analyzed by our AI engine', tier: 'premium', category: 'ai', icon: Sparkles },
];

// --- Category Tab Bar ---
const CategoryTabBar = ({ active, onPress, isDarkMode }: {
  active: string; onPress: (key: string) => void; isDarkMode: boolean;
}) => (
  <View className={`border-b ${isDarkMode ? 'border-white/[0.04]' : 'border-black/[0.04]'}`}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16, gap: 10 }}
    >
      {CATEGORIES.map(cat => {
        const isActive = active === cat.key;
        const CatIcon = cat.icon;
        return (
          <TouchableOpacity
            key={cat.key}
            onPress={() => onPress(cat.key)}
            activeOpacity={0.7}
            className={`flex-row items-center px-6 py-3 rounded-full border ${
              isActive
                ? 'bg-white border-white'
                : 'bg-white/5 border-white/5'
            }`}
          >
            <CatIcon
              size={14}
              color={isActive ? '#000000' : 'rgba(255,255,255,0.4)'}
              strokeWidth={2}
            />
            <Text className={`text-[11px] font-black uppercase tracking-[1px] ml-2.5 ${
              isActive ? 'text-black' : 'text-white/40'
            }`}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
);

// --- Featured Tool Card ---
const FeaturedToolCard = ({ tool, isLocked, isDarkMode, onPress }: {
  tool: Tool; isLocked: boolean; isDarkMode: boolean; onPress: () => void;
}) => {
  const IconComp = tool.icon;
  const tierCfg = TIER_CONFIG[tool.tier];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} className="mx-6 mt-8 mb-4">
      <View
        className={`rounded-[48px] overflow-hidden border border-white/10 shadow-2xl bg-black`}
      >
        <LinearGradient
          colors={['#1C1C1E', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-10"
        >
          {/* Background Decorative Element */}
          <View className="absolute -right-10 -top-10 opacity-[0.03]" pointerEvents="none">
             <Bot size={220} color="white" />
          </View>

          <View className="flex-row items-start justify-between mb-8">
            <View className={`w-16 h-16 rounded-[22px] items-center justify-center ${tierCfg.bgColor} border border-white/10`}>
               <IconComp size={32} color={tierCfg.color} strokeWidth={1.5} />
            </View>
            <View className="items-end">
              <View className="flex-row items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 mb-2">
                <Crown size={14} color="white" strokeWidth={2} />
                <Text className="text-white text-[10px] font-black uppercase tracking-[2px]">Elite Algo</Text>
              </View>
              <View className="flex-row items-center gap-1.5 opacity-40">
                <Activity size={10} color="white" />
                <Text className={`text-[9px] font-black uppercase tracking-widest text-white`}>98.4% Accuracy</Text>
              </View>
            </View>
          </View>

          <View className="mb-10">
            <View className="flex-row items-center mb-2">
              <Sparkles size={14} color="white" opacity={0.5} className="mr-2" />
              <Text className="text-white/50 text-[10px] font-black uppercase tracking-[3px]">Next-Gen Analyzer</Text>
            </View>
            <Text className={`text-3xl font-black tracking-tighter leading-8 text-white`}>
              {tool.name}
            </Text>
            <Text className={`text-[15px] leading-6 mt-3 text-white/40 font-medium max-w-[90%]`}>
              {tool.description}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row gap-2">
              <View className={`flex-row items-center px-4 py-2 rounded-full ${tierCfg.bgColor} border border-white/10`}>
                <Text style={{ color: tierCfg.color }} className="text-[10px] font-black uppercase tracking-wider">
                  {tierCfg.label}
                </Text>
              </View>
            </View>

            {isLocked ? (
              <View className="flex-row items-center gap-2 bg-white/5 px-6 py-3.5 rounded-full border border-white/10">
                <Lock size={14} color="rgba(255,255,255,0.4)" strokeWidth={2} />
                <Text className={`text-[12px] font-black uppercase tracking-widest text-white/40`}>
                  Locked
                </Text>
              </View>
            ) : (
              <TouchableOpacity 
                onPress={onPress}
                activeOpacity={0.9}
                className="flex-row items-center gap-3 bg-white px-8 py-3.5 rounded-full shadow-2xl shadow-white/10"
              >
                <Text className="text-black text-xs font-black uppercase tracking-widest">Launch</Text>
                <ArrowRight size={16} color="black" strokeWidth={2.5} />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

// --- Tool Card ---
const ToolCard = ({ tool, isLocked, isDarkMode, onPress }: {
  tool: Tool; isLocked: boolean; isDarkMode: boolean; onPress: () => void;
}) => {
  const IconComp = tool.icon;
  const tierCfg = TIER_CONFIG[tool.tier];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={isLocked ? 0.8 : 0.7}
      className={`p-6 rounded-[32px] border border-white/5 mb-4 mx-6 ${
        isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white'
      }`}
    >
      <View className="flex-row items-center">
        {/* Icon */}
        <View className={`w-14 h-14 rounded-2xl items-center justify-center mr-5 ${
          isLocked ? 'bg-white/5' : tierCfg.bgColor
        } border border-white/5`}>
          {isLocked ? (
            <Lock size={20} color="rgba(255,255,255,0.2)" strokeWidth={2.5} />
          ) : (
            <IconComp size={24} color={tierCfg.color} strokeWidth={2} />
          )}
        </View>

        {/* Content */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1.5">
            <Text
              className={`text-[16px] font-black tracking-tight text-white`}
              numberOfLines={1}
            >
              {tool.name}
            </Text>
            <View className={`px-2.5 py-1 rounded-full ${tierCfg.bgColor} border border-white/5`}>
              <Text style={{ color: tierCfg.color }} className="text-[9px] font-black uppercase tracking-wider">
                {tierCfg.label}
              </Text>
            </View>
          </View>
          <Text
            className={`text-[13px] leading-[20px] text-white/40 font-medium`}
            numberOfLines={2}
          >
            {tool.description}
          </Text>

          {/* Action */}
          {isLocked ? (
            <View className="flex-row items-center mt-4">
              <Lock size={12} color="rgba(255,255,255,0.3)" strokeWidth={2} />
              <Text className={`text-[11px] font-black ml-2 uppercase tracking-widest text-white/30`}>
                Premium Upgrade
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center mt-4">
              <Text className="text-white text-[11px] font-black uppercase tracking-[3px] mr-2">Launch Terminal</Text>
              <ArrowRight size={12} color="white" strokeWidth={3} />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- Main Screen ---
export const ToolsScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const { tier } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isToolAccessible = (toolTier: Tier) => TIER_RANK[tier] >= TIER_RANK[toolTier];

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredTool = useMemo(() => {
    const fTool = TOOLS.find(t => t.featured);
    if (!fTool) return null;
    
    const matchesCategory = activeCategory === 'all' || fTool.category === activeCategory;
    const matchesSearch = fTool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         fTool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return (matchesCategory && matchesSearch) ? fTool : null;
  }, [activeCategory, searchQuery]);

  const listTools = useMemo(() => {
    return filteredTools.filter(t => !t.featured);
  }, [filteredTools]);

  const handleToolPress = (tool: Tool) => {
    if (isToolAccessible(tool.tier)) {
      console.log(`Opening tool: ${tool.name}`);
    } else {
      console.log(`Upgrade required for: ${tool.name}`);
      navigation.navigate('Subscription');
    }
  };

  return (
    <Container className="flex-1">
      <Header
        title="Utility Hub"
        subtitle="Professional grade tools"
        onLeftPress={() => (navigation as any).openDrawer()}
        rightControl={
          <TouchableOpacity 
            onPress={() => navigation.navigate('Chart')}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/5"
          >
            <LineChart size={20} color="white" strokeWidth={2} />
          </TouchableOpacity>
        }
      />

      {/* Search Bar */}
      <View className="px-6 pt-6 pb-4">
        <View className={`flex-row items-center h-14 px-6 rounded-full border border-white/5 bg-[#1C1C1E]`}>
          <Search size={20} color="rgba(255,255,255,0.4)" />
          <TextInput
            placeholder="Search tools, AI analyzers..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className={`flex-1 ml-4 text-sm font-medium text-white`}
            style={{ outlineStyle: 'none' } as any}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Tabs */}
      <CategoryTabBar
        active={activeCategory}
        onPress={setActiveCategory}
        isDarkMode={isDarkMode}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Featured Tool */}
        {featuredTool && (
          <FeaturedToolCard
            tool={featuredTool}
            isLocked={!isToolAccessible(featuredTool.tier)}
            isDarkMode={isDarkMode}
            onPress={() => handleToolPress(featuredTool)}
          />
        )}

        {/* Section Label */}
        <View className="px-8 pt-8 pb-4">
          <Text className={`text-[11px] font-black uppercase tracking-[4px] text-white/20`}>
            {searchQuery ? 'Search Results' : (activeCategory === 'all' ? 'Core Inventory' : CATEGORIES.find(c => c.key === activeCategory)?.label)}
          </Text>
        </View>

        {/* Tools List */}
        {listTools.length > 0 ? (
          listTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isLocked={!isToolAccessible(tool.tier)}
              isDarkMode={isDarkMode}
              onPress={() => handleToolPress(tool)}
            />
          ))
        ) : (
          !featuredTool && (
            <View className="items-center py-24">
              <View className={`w-20 h-20 rounded-[32px] items-center justify-center mb-6 bg-white/5 border border-white/5`}>
                <Search size={32} color="rgba(255,255,255,0.1)" strokeWidth={1} />
              </View>
              <Text className={`text-[16px] font-black text-white/30 tracking-tight`}>
                No matching tools found
              </Text>
              <Text className={`text-[13px] font-medium mt-2 text-white/10`}>
                Try adjusting your search criteria
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </Container>
  );
};
