import React, { useState, useMemo, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, Animated, StyleSheet, Pressable, Platform } from 'react-native';
import { Container } from '../components/Container';
import { CourseCard } from '../components/CourseCard';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { Filter, X, Check, Target, Zap, BarChart3, Waves, LayoutGrid, List, PlayCircle, CheckCircle2, Bookmark } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';

// --- Types ---
type CourseStatus = 'All' | 'Ongoing' | 'Completed' | 'Available';
type ViewMode = 'grid' | 'list';

// --- Dummy Data ---
const CATEGORIES = [
  { label: 'All', key: 'All', icon: Waves },
  { label: 'Forex', key: 'Forex', icon: Target },
  { label: 'Crypto', key: 'Crypto', icon: Zap },
  { label: 'Stocks', key: 'Stocks', icon: BarChart3 },
];

const STATUS_OPTIONS: { label: string; key: CourseStatus; icon: any }[] = [
  { label: 'All Status', key: 'All', icon: Waves },
  { label: 'Ongoing', key: 'Ongoing', icon: PlayCircle },
  { label: 'Finished', key: 'Completed', icon: CheckCircle2 },
  { label: 'New', key: 'Available', icon: Bookmark },
];

const COURSES_DATA = [
  {
    id: '1',
    title: 'Forex Mastery 101',
    instructor: 'Alex Rivera',
    category: 'Forex',
    progress: 85,
    rating: 4.9,
    isTrending: true,
    imageUrl: 'https://images.unsplash.com/photo-1611974714658-94189381786e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Crypto Order Flow',
    instructor: 'David Chen',
    category: 'Crypto',
    progress: 42,
    rating: 4.7,
    isTrending: false,
    imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Advanced Price Action',
    instructor: 'Marcus Vane',
    category: 'Forex',
    progress: 64,
    rating: 4.9,
    isTrending: true,
    imageUrl: 'https://images.unsplash.com/photo-1611095773767-114b51c88d2a?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Ethereum & Smart Contracts',
    instructor: 'Vitalik Fan',
    category: 'Crypto',
    progress: 0,
    rating: 4.5,
    isTrending: false,
    imageUrl: 'https://images.unsplash.com/photo-1622790694515-6d5955a15372?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Scalping Strategies',
    instructor: 'Jordan Belfort',
    category: 'Forex',
    progress: 75,
    rating: 4.8,
    isTrending: false,
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Institutional Liquidity',
    instructor: 'Alex Rivera',
    category: 'Forex',
    progress: 100,
    rating: 5.0,
    isTrending: true,
    imageUrl: 'https://images.unsplash.com/photo-1611095773767-114b51c88d2a?q=80&w=400&auto=format&fit=crop',
  }
];

export const CoursesScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<CourseStatus>('All');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Animation Values
  const animation = useRef(new Animated.Value(0)).current;

  const toggleFilter = (open: boolean) => {
    setIsFilterOpen(open);
    Animated.spring(animation, {
      toValue: open ? 1 : 0,
      useNativeDriver: Platform.OS !== 'web',
      tension: 50,
      friction: 8,
    }).start();
  };

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || course.category === selectedCategory;
      
      let matchStatus = true;
      if (selectedStatus === 'Ongoing') {
        matchStatus = course.progress > 0 && course.progress < 100;
      } else if (selectedStatus === 'Completed') {
        matchStatus = course.progress === 100;
      } else if (selectedStatus === 'Available') {
        matchStatus = course.progress === 0;
      }
      
      return matchSearch && matchCategory && matchStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-600, 0],
  });

  const backdropOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedStatus('All');
    toggleFilter(false);
  };

  const searchPlaceholderColor = isDarkMode ? '#A0A0A0' : '#888888';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const pillBg = isDarkMode ? 'bg-[#1E293B]' : 'bg-black/5';

  return (
    <Container className="flex-1">
      <View className="z-50">
        <Header
          onLeftPress={() => (navigation as any).openDrawer()}
          centerControl={
            <View className="flex-row items-center px-5 h-12 rounded-full w-full bg-[#1C1C1E] border border-white/10">
              <Ionicons name="search-sharp" size={18} color="rgba(255,255,255,0.5)" />
              <TextInput
                placeholder="Search assets or courses..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                className="flex-1 ml-3 h-full text-sm font-medium text-white"
                value={searchQuery}
                onChangeText={setSearchQuery}
                selectionColor="#FFFFFF"
                style={{ outlineStyle: 'none' } as any}
              />
            </View>
          }
          rightControl={
            <TouchableOpacity 
              onPress={() => toggleFilter(!isFilterOpen)}
              className={`p-2.5 rounded-2xl border ${isFilterOpen ? 'bg-white border-white' : 'bg-white/5 border-white/5'}`}
            >
              {isFilterOpen ? (
                <X size={20} color="black" strokeWidth={2.5} />
              ) : (
                <Filter size={20} color="white" strokeWidth={2} />
              )}
            </TouchableOpacity>
          }
        />
      </View>

      <View className="flex-1 relative">
        {/* BACKDROP OVERLAY */}
        {isFilterOpen && (
          <Pressable 
            style={StyleSheet.absoluteFill} 
            onPress={() => toggleFilter(false)}
            className="z-40"
          >
             <Animated.View style={{ opacity: backdropOpacity }} className="flex-1 bg-black" />
          </Pressable>
        )}

        {/* TOP SHEET FILTER (RESTORED) */}
        <Animated.View 
          style={{ transform: [{ translateY }] }}
          className={`absolute top-0 left-0 right-0 z-40 pb-10 rounded-b-[48px] ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white shadow-xl'}`}
        >
          <View className="px-8 pt-4">
            <Text className={`${isDarkMode ? 'text-white/30' : 'text-black/30'} text-[11px] font-black uppercase tracking-[4px] mb-5`}>
              Market Categories
            </Text>
            
            <View className="flex-row flex-wrap justify-between mb-5">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.key;
                const Icon = cat.icon;
                return (
                  <TouchableOpacity
                    key={cat.key}
                    onPress={() => setSelectedCategory(cat.key)}
                    style={{ width: '48%' }}
                    className={`flex-row items-center p-5 rounded-[24px] mb-4 border ${
                      isActive 
                        ? 'bg-white border-white' 
                        : (isDarkMode ? 'bg-white/5 border-white/5' : 'bg-black/[0.02] border-black/[0.02]')
                    }`}
                  >
                    <View className={`w-9 h-9 rounded-xl items-center justify-center ${isActive ? 'bg-black/10' : isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                        <Icon size={18} color={isActive ? 'black' : (isDarkMode ? 'white' : 'black')} opacity={isActive ? 1 : 0.5} />
                    </View>
                    <Text className={`ml-4 text-[14px] font-black ${isActive ? 'text-black' : isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {cat.key}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text className={`${isDarkMode ? 'text-white/30' : 'text-black/30'} text-[11px] font-black uppercase tracking-[4px] mb-5 mt-2`}>
              Enrollment Status
            </Text>
            
            <View className="flex-row flex-wrap gap-3 mb-8">
              {STATUS_OPTIONS.map((opt) => {
                const isActive = selectedStatus === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    onPress={() => setSelectedStatus(opt.key)}
                    className={`flex-row items-center px-6 py-3 rounded-full border ${
                      isActive 
                        ? 'bg-white border-white' 
                        : (isDarkMode ? 'bg-white/5 border-white/5' : 'bg-black/2 border-black/5')
                    }`}
                  >
                    <Text className={`text-[12px] font-black uppercase tracking-wider ${isActive ? 'text-black' : isDarkMode ? 'text-white/40' : 'text-black/25'}`}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="flex-row gap-4">
                <TouchableOpacity 
                   onPress={resetFilters}
                   className={`flex-1 h-16 rounded-[24px] items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}
                >
                    <Text className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Reset All</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                   onPress={() => toggleFilter(false)}
                   className="flex-[2] h-16 rounded-[24px] bg-white items-center justify-center shadow-2xl shadow-white/10"
                >
                    <Text className="text-black text-sm font-black uppercase tracking-widest">Apply Filter</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* TOP PILL FILTERS (QUICK ACCESS) */}
        <View className="flex-row items-center px-6 pt-5 pb-3 z-10">
           <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1 pr-4">
              <View className="flex-row gap-3">
                {CATEGORIES.map(cat => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <TouchableOpacity 
                      key={cat.key} 
                      onPress={() => setSelectedCategory(cat.key)}
                      className={`px-7 py-3 rounded-full ${isActive ? 'bg-white' : pillBg}`}
                    >
                      <Text className={`text-[11px] font-black uppercase tracking-[2px] ${isActive ? 'text-black' : (isDarkMode ? 'text-white/50' : 'text-black/30')}`}>
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
           </ScrollView>
           
           <View className={`w-[1px] h-7 mx-3 ${isDarkMode ? 'bg-white/15' : 'bg-black/15'}`} />
           
           <TouchableOpacity 
              onPress={() => setViewMode(prev => prev === 'list' ? 'grid' : 'list')}
              className={`w-11 h-11 rounded-full items-center justify-center ${pillBg}`}
           >
              {viewMode === 'list' ? (
                <LayoutGrid size={20} color={isDarkMode ? 'white' : 'black'} opacity={0.7} />
              ) : (
                <List size={20} color={isDarkMode ? 'white' : 'black'} opacity={0.7} />
              )}
           </TouchableOpacity>
        </View>

        {/* LIST SECTION */}
        <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1">
          <FlatList
            key={viewMode}
            numColumns={viewMode === 'grid' ? 2 : 1}
            data={filteredCourses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CourseCard
                {...item}
                layout={viewMode}
                onPress={() => navigation.navigate('Main', { screen: 'CourseDetails', params: { id: item.id } })}
                className={viewMode === 'grid' ? 'mx-2' : ''}
              />
            )}
            columnWrapperStyle={viewMode === 'grid' ? { paddingHorizontal: 16, justifyContent: 'space-between' } : null}
            contentContainerStyle={{ paddingHorizontal: viewMode === 'list' ? 20 : 0, paddingTop: 12, paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <View className="items-center justify-center py-24 mt-12">
                <Ionicons name="documents-outline" size={64} color={searchPlaceholderColor} />
                <Text className={`${searchPlaceholderColor} mt-5 text-center px-10 font-bold text-base`}>
                  No matching courses.
                </Text>
                <TouchableOpacity 
                   onPress={resetFilters}
                   className="mt-8 px-8 py-3 rounded-full bg-white/10 border border-white/5"
                >
                    <Text className="text-white text-xs font-black uppercase tracking-widest">Clear All Filters</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    </Container>
  );
};
