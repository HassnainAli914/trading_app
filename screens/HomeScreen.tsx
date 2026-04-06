import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_PADDING = 24;
const CARD_WIDTH = SCREEN_WIDTH * 0.85; // 85% of screen width for carousel

import { Container } from '../components/Container';
import { SectionHeader } from '../components/SectionHeader';
import { FeaturedCard } from '../components/FeaturedCard';
import { NewsCard } from '../components/NewsCard';
import { PromoCard } from '../components/PromoCard';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { PanelLeftOpen } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../components/HomeHeader';
import { TradingMotionBG } from '../components/TradingMotionBG';
import { CategoryPill } from '../components/CategoryPill';
import { StrategyCard } from '../components/StrategyCard';
import { ProgressCard } from '../components/ProgressCard';
import { GridCard } from '../components/GridCard';
import { Search, SlidersHorizontal, Sparkles, Globe, Coins, Bitcoin, Zap } from 'lucide-react-native';
import { TextInput } from 'react-native';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'forex', label: 'Forex', icon: Globe },
  { id: 'crypto', label: 'Crypto', icon: Bitcoin },
  { id: 'gold', label: 'Gold', icon: Coins },
  { id: 'ai', label: 'AI Tools', icon: Zap },
];

const GRID_RESOURCES = [
  {
    id: '1',
    title: 'XAUUSD Institutional',
    market: 'Gold / FX',
    price: '199',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'BTC Order Flow Pro',
    market: 'Crypto',
    price: '149',
    imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Price Action Foundations',
    market: 'Education',
    price: '0',
    imageUrl: 'https://images.unsplash.com/photo-1611974714658-94189381786e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Sentiment Scanner AI',
    market: 'Utility',
    price: '59',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400&auto=format&fit=crop',
  }
];

export const HomeScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('popular'); // Default to popular as in image

  const STRATEGY_DATA = [
    {
      id: '1',
      title: 'ICT Power Hour Strategy',
      category: 'Institutional Trading',
      duration: '4-Week Prep',
      price: '199',
      imageUrl: 'https://images.unsplash.com/photo-1611974714658-94189381786e?q=80&w=600&auto=format&fit=crop',
      participants: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      ]
    },
    {
      id: '2',
      title: 'Volume Profile Advanced',
      category: 'Order Flow',
      duration: '8-Week Masterclass',
      price: '0',
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
      participants: [
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      ]
    }
  ];

  const PROGRESS_DATA = [
    {
      title: 'XAUUSD Core Scalping',
      category: 'Market Cycles',
      progress: 68,
      lessons: '18/24 modules',
      imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698bcd9?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Silver Bullet Mastery',
      category: 'Price Action',
      progress: 22,
      lessons: '4/14 modules',
      imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const theme = {
    bg: isDarkMode ? 'bg-[#0C0C0C]' : 'bg-[#F9F9F9]',
    text: isDarkMode ? 'text-white' : 'text-black',
    subtext: isDarkMode ? 'text-white/40' : 'text-black/40',
    searchBg: isDarkMode ? 'bg-white/5' : 'bg-black/5',
    searchIcon: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
    filterBg: isDarkMode ? 'bg-white' : 'bg-black',
    filterIcon: isDarkMode ? 'black' : 'white',
  };

  return (
    <Container className="flex-1 bg-transparent">
      {/* INSTITUTIONAL MOTION BACKGROUND */}
      <TradingMotionBG />

      {/* ABSOLUTE GLASSY HEADER */}
      <View className="absolute top-0 left-0 right-0 z-50">
        <HomeHeader 
          userName="Brooks"
          welcomeMessage="Institutional Terminal Active"
          onMenuPress={() => (navigation as any).openDrawer()}
          onProfilePress={() => navigation.navigate('Profile')}
        />
      </View>

      <ScrollView 
        className="flex-1 bg-transparent" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ 
          paddingTop: 160, // Adjust for absolute header height
          paddingBottom: 160 
        }}
      >
        {/* PAGE CONTENT: SEARCH (VANESSA STYLE + TRANSVERSAL) */}
        <View className="px-6 pt-4 pb-2">
           <View className="flex-row items-center gap-3 mb-8">
              <View 
                className={`flex-1 flex-row items-center ${theme.searchBg} h-14 rounded-full px-6 border ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}
              >
                 <Search size={20} color={theme.searchIcon} strokeWidth={2.5} />
                 <TextInput 
                   placeholder="Search strategies, AI assets..."
                   placeholderTextColor={theme.searchIcon}
                   className={`flex-1 ml-3 ${theme.text} font-semibold text-sm h-full`}
                   value={searchQuery}
                   onChangeText={setSearchQuery}
                   style={{ outlineStyle: 'none' } as any}
                 />
              </View>
              <TouchableOpacity 
                className={`w-14 h-14 rounded-full ${theme.filterBg} items-center justify-center shadow-lg`}
              >
                 <SlidersHorizontal size={20} color={theme.filterIcon} strokeWidth={2.5} />
              </TouchableOpacity>
           </View>
        </View>

        {/* CATEGORY PILLS SECTION */}
        <View className="mb-10">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {['All', 'Popular', 'SMC', 'Forex', 'Crypto', 'Indices'].map((cat) => (
              <CategoryPill 
                key={cat}
                label={cat}
                active={activeCategory.toLowerCase() === cat.toLowerCase()}
                onPress={() => setActiveCategory(cat.toLowerCase())}
              />
            ))}
          </ScrollView>
        </View>

        {/* NEW STRATEGIES SECTION (NEW CLASSES) */}
        <View className="mb-12">
          <View className="flex-row items-center justify-between px-6 mb-6">
            <Text className={`${theme.text} text-[24px] font-black tracking-tight leading-7`}>
               Market Strategies
            </Text>
            <TouchableOpacity>
              <Text className={`${theme.subtext} text-[12px] font-bold tracking-tight uppercase`}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {STRATEGY_DATA.map((item, idx) => (
              <StrategyCard 
                key={idx}
                title={item.title}
                category={item.category}
                duration={item.duration}
                price={item.price}
                participants={item.participants}
                imageUrl={item.imageUrl}
                width={300}
                onPress={() => navigation.navigate('CourseDetails', { id: item.id })}
              />
            ))}
          </ScrollView>
        </View>

        {/* ACTIVE PROGRESS SECTION (YOUR CLASSES) */}
        <View className="mb-12">
          <View className="flex-row items-center justify-between px-6 mb-6">
            <Text className={`${theme.text} text-[24px] font-black tracking-tight leading-7`}>
               Active Progress
            </Text>
            <TouchableOpacity>
              <Text className={`${theme.subtext} text-[12px] font-bold tracking-tight uppercase`}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {PROGRESS_DATA.map((item, idx) => (
              <ProgressCard 
                key={idx}
                title={item.title}
                category={item.category}
                progress={item.progress}
                lessons={item.lessons}
                imageUrl={item.imageUrl}
                width={300}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </Container>
  );
};
