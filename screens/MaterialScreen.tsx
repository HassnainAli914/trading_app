import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { Container } from '../components/Container';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Bell, 
  FileText, 
  Play, 
  LayoutGrid, 
  Code2, 
  Bookmark, 
  Download, 
  ChevronRight,
  Sparkles,
  PanelLeftOpen
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CATEGORIES = ['All', 'Strategy', 'Indicators', 'E-Books', 'Templates'];

const ACTIVE_RESOURCES = [
  {
    id: '1',
    title: 'Risk-Reward Tool',
    description: 'Precise lot sizing and risk management.',
    type: 'PDF',
    size: '2.4 MB',
    badge: 'NEW',
    icon: FileText,
    iconBg: 'bg-white/10'
  },
  {
    id: '2',
    title: 'Order Flow Master',
    description: 'Deep dive into institutional candle patterns.',
    type: 'MP4',
    size: '128 MB',
    duration: '45:20',
    badge: 'PREMIUM',
    icon: Play,
    iconBg: 'bg-white/10'
  },
  {
    id: '3',
    title: 'Journaling Template',
    description: 'Automated performance tracking for traders.',
    type: 'XLSX',
    size: '850 KB',
    badge: null,
    icon: LayoutGrid,
    iconBg: 'bg-white/10'
  },
  {
    id: '4',
    title: 'Custom SMC Indicator',
    description: 'Pine Script v5 indicator for fair value gaps.',
    type: 'CODE',
    size: '12 KB',
    badge: 'NEW',
    icon: Code2,
    iconBg: 'bg-white/10'
  }
];

export const MaterialScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const labelColor = isDarkMode ? 'text-white/40' : 'text-black/40';
  const cardBg = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white';
  const inputBg = isDarkMode ? 'bg-[#1C1C1E]' : 'bg-[#F3F4F6]';

  return (
    <Container className="flex-1">
      <SafeAreaView edges={['top']} className="flex-1">
        {/* HEADER (MONOCHROMATIC) */}
        <View className="flex-row items-center justify-between px-6 py-4 bg-black">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => (navigation as any).openDrawer()}
              className="p-2.5 rounded-2xl bg-white/5 border border-white/5 mr-4"
              activeOpacity={0.7}
            >
              <PanelLeftOpen 
                size={20} 
                color="white" 
                strokeWidth={2} 
              />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-black tracking-tighter">ATELIER</Text>
          </View>
          <TouchableOpacity className="p-2.5 rounded-2xl bg-white/5 border border-white/5 items-center justify-center">
            <Bell size={20} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          {/* INTRO */}
          <View className="px-6 mt-6 mb-8">
            <Text className={`${textColor} text-4xl font-black mb-3 tracking-tighter`}>Institutional Hub</Text>
            <Text className={`${labelColor} text-sm font-medium leading-5 max-w-[80%]`}>
              High-fidelity resources for professional market execution and analysis.
            </Text>
          </View>

          {/* SEARCH BAR (MONOCHROMATIC) */}
          <View className="px-6 mb-8">
            <View className="bg-[#1C1C1E] h-14 rounded-full flex-row items-center px-6 border border-white/5">
              <Search size={20} color="rgba(255,255,255,0.4)" />
              <TextInput 
                placeholder="Search resources..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                className="flex-1 ml-4 h-full text-white font-medium text-sm"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ outlineStyle: 'none' } as any}
              />
            </View>
          </View>

          {/* CATEGORIES */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="pl-6 mb-10"
            contentContainerStyle={{ paddingRight: 32 }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <TouchableOpacity 
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  className={`mr-3 px-7 py-3.5 rounded-full border ${isActive ? 'bg-white border-white' : 'bg-white/5 border-white/5'}`}
                >
                  <Text className={`text-[11px] font-black uppercase tracking-[2px] ${isActive ? 'text-black' : labelColor}`}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* FEATURED HUB CARD (UI REDESIGN) */}
          <View className="px-6 mb-12">
            <View className={`rounded-[48px] overflow-hidden ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-100'} border border-white/5 shadow-2xl`}>
              <View className="p-10 min-h-[320px] relative">
                {/* Institutional Graphic Overlay */}
                <View className="absolute top-0 right-0 opacity-[0.03]" style={{ transform: [{translateX: 60}, {translateY: -30}] }}>
                   <Sparkles size={320} color="white" />
                </View>

                {/* Status Badges Section */}
                <View className="flex-row mb-8 items-center">
                  <View className="bg-white px-4 py-1.5 rounded-full mr-2">
                    <Text className="text-black text-[10px] font-black uppercase tracking-wider">Featured</Text>
                  </View>
                  <View className="bg-white/10 px-4 py-1.5 rounded-full">
                    <Text className="text-white/50 text-[10px] font-black uppercase tracking-wider">Update</Text>
                  </View>
                </View>

                {/* Primary Content */}
                <View className="mb-10">
                  <Text className={`${textColor} text-3xl font-black mb-4 tracking-tighter leading-8`}>
                     Monthly Market Playbook: Q4 Peak Volume
                  </Text>
                  <Text className={`${labelColor} text-sm font-medium leading-6 pr-4 opacity-80`}>
                    Institutional-grade analysis on volatility clusters and year-end liquidity transitions.
                  </Text>
                </View>

                {/* Action Hub */}
                <View className="flex-row items-center justify-between mt-auto">
                   <View className="flex-row items-center">
                      <FileText size={20} color="white" opacity={0.3} />
                      <Text className={`${labelColor} text-[12px] font-black uppercase ml-3 tracking-[3px]`}>PDF • 18 MB</Text>
                   </View>
                   
                   <TouchableOpacity 
                      activeOpacity={0.9}
                      className="h-16 px-10 rounded-full bg-white flex-row items-center justify-center shadow-2xl shadow-white/10"
                   >
                        <Text className="text-black text-xs font-black uppercase tracking-widest mr-3">Access</Text>
                        <Ionicons name="arrow-forward" size={18} color="black" />
                   </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* ACTIVE RESOURCES (EXPANDABLE) */}
          <View className="px-6">
            <View className="flex-row justify-between items-center mb-8">
               <Text className={`${textColor} text-[14px] font-black uppercase tracking-[3px]`}>Active Resources</Text>
               <TouchableOpacity className="flex-row items-center">
                 <Text className="text-white text-[12px] font-black uppercase tracking-wider mr-1">View All</Text>
                 <ChevronRight size={16} color="white" strokeWidth={2.5} />
               </TouchableOpacity>
            </View>

            {ACTIVE_RESOURCES.map((res) => {
              const isExpanded = expandedId === res.id;
              return (
                <View key={res.id} className={`${cardBg} rounded-[32px] mb-5 border border-white/5 shadow-xl overflow-hidden`}>
                  <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => toggleExpand(res.id)}
                    className="p-6 flex-row items-center"
                  >
                    <View className={`w-14 h-14 rounded-2xl items-center justify-center bg-white/5 border border-white/5 mr-5`}>
                        <res.icon size={24} color="white" opacity={0.8} />
                    </View>
                    
                    <View className="flex-1">
                      <View className="flex-row items-center mb-1.5">
                        <Text className={`${textColor} text-base font-black mr-2`} numberOfLines={1}>{res.title}</Text>
                        {res.badge && (
                          <View className="bg-white/10 px-2 py-0.5 rounded-md">
                            <Text className="text-white text-[9px] font-black uppercase tracking-wider">{res.badge}</Text>
                          </View>
                        )}
                      </View>
                      {!isExpanded && <Text className={`${labelColor} text-[12px] font-medium mb-1.5`} numberOfLines={1}>{res.description}</Text>}
                      <Text className={`${labelColor} text-[10px] font-black uppercase tracking-[2px]`}>
                        {res.type} • {res.size} {res.duration ? `• ${res.duration}` : ''}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* EXPANDED INTEL SECTION */}
                  {isExpanded && (
                    <View className="px-6 pb-8 pt-2 border-t border-white/5">
                        <Text className={`${labelColor} text-[14px] leading-[24px] font-medium mb-8`}>
                           Institutional deep-dive into the technical strategies regarding {res.title.toLowerCase()}. This resource contains premium intel released recently.
                        </Text>
                        
                        <View className="flex-row items-center gap-5 mb-8">
                           <View className="flex-row items-center">
                              <Ionicons name="time-outline" size={16} color="#888" />
                              <Text className={`${labelColor} text-[11px] font-black uppercase ml-2 tracking-widest`}>Oct 2023</Text>
                           </View>
                           <View className="flex-row items-center">
                              <Ionicons name="download-outline" size={16} color="#888" />
                              <Text className={`${labelColor} text-[11px] font-black uppercase ml-2 tracking-widest`}>{res.size}</Text>
                           </View>
                        </View>

                        <View className="flex-row gap-4">
                           <TouchableOpacity 
                             className="flex-1 h-16 bg-white rounded-[24px] items-center justify-center shadow-xl shadow-white/5"
                           >
                              <Text className="text-black text-xs font-black uppercase tracking-[2px]">Access Document</Text>
                           </TouchableOpacity>
                           <TouchableOpacity 
                             className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} w-16 h-16 rounded-[24px] items-center justify-center border border-white/5`}
                           >
                              <Bookmark size={22} color="white" opacity={0.6} />
                           </TouchableOpacity>
                           <TouchableOpacity 
                             className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} w-16 h-16 rounded-[24px] items-center justify-center border border-white/5`}
                           >
                              <Download size={22} color="white" opacity={0.6} />
                           </TouchableOpacity>
                        </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default MaterialScreen;
