import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Container } from '../components/Container';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Bookmark, 
  Download, 
  Play, 
  Volume2, 
  Maximize2, 
  Plus, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  List,
  FileText,
  ExternalLink,
  Type
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const NOTES = [
  {
    id: '1',
    time: '04:12',
    content: 'Liquidity grab often happens before a major trend reversal. Watch for long wicks into supply zones.'
  },
  {
    id: '2',
    time: '08:55',
    content: "Institutional orders don't appear in the regular order book. Use volume profile to identify these zones."
  },
  {
    id: '3',
    time: '11:20',
    content: 'Remember to cross-reference with the daily timeframe for HTF bias.'
  }
];

const RESOURCES = [
  { id: '1', title: 'Institutional Liquidity PDF', size: '2.4 MB', type: 'PDF' },
  { id: '2', title: 'Order Flow Cheat Sheet', size: '1.1 MB', type: 'IMG' },
  { id: '3', title: 'Risk Management Excel', size: '0.8 MB', type: 'XLS' },
];

const TRANSCRIPT_DATA = [
  { time: '00:00', text: "Welcome back to Module 04. Today we're diving deep into technical liquidity." },
  { time: '02:15', text: "Notice how the retail stop-losses are clustered below the previous swing low. This is prime real-estate for institutional players." },
  { time: '05:30', text: "We call this a 'liquidity grab'. The market needs to fill large buy orders, and it finds that liquidity exactly where retailers are exiting." },
  { time: '12:45', text: "At this stage, you want to look for a displacement in the opposite direction. This confirms that the whales have finished their accumulation." },
  { time: '18:10', text: "Next lesson, we'll talk about how to enter these trades with a high RR ratio. See you there." }
];

export const LessonPlayer = ({ navigation, route }: any) => {
  const { isDarkMode } = useThemeStore();
  const { title = 'Understanding Institutional Liquidity Pools' } = route.params || {};
  const [activeTab, setActiveTab] = useState('Notes');

  // Sync with CourseDetails main background
  // FORCE DARK MODE for navigation components
  const appBg = isDarkMode ? 'bg-dark-primary' : 'bg-light-secondary';
  const headerGray = 'bg-[#121212]';
  const cardGray = isDarkMode ? 'bg-[#242424]' : 'bg-white';
  const navbarGray = 'bg-[#121212]';
  
  const textColor = isDarkMode ? 'text-white' : 'text-[#1F2937]';
  const navTextColor = 'text-white';
  const labelColor = isDarkMode ? 'text-white/40' : 'text-black/40';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Notes':
        return (
          <View>
            <View className="flex-row items-center justify-between mb-6">
              <Text className={`${textColor} text-[13px] font-black uppercase tracking-[2px]`}>Your Private Notes</Text>
              <TouchableOpacity className={`${isDarkMode ? 'bg-white/10' : 'bg-black/10'} px-4 py-2 rounded-xl flex-row items-center`}>
                <Plus size={14} color={isDarkMode ? 'white' : 'black'} className="mr-1.5" />
                <Text className={`${textColor} text-[11px] font-black uppercase ml-1.5`}>Add Note</Text>
              </TouchableOpacity>
            </View>

            {NOTES.map((note) => (
              <View key={note.id} className={`${cardGray} rounded-[24px] p-5 mb-4 border-[1px] ${isDarkMode ? 'border-white/5' : 'border-black/5'} shadow-sm`}>
                <View className="flex-row items-center justify-between mb-3">
                   <View className="bg-[#00FFB2]/20 px-2.5 py-1 rounded-md">
                      <Text className="text-[#00FFB2] text-[10px] font-black tracking-wider">{note.time}</Text>
                   </View>
                   <TouchableOpacity>
                     <MoreVertical size={16} color={isDarkMode ? 'white/30' : 'black/30'} />
                   </TouchableOpacity>
                </View>
                <Text className={`${isDarkMode ? 'text-white/70' : 'text-black/70'} text-[13px] leading-[22px] font-medium`}>
                  {note.content}
                </Text>
              </View>
            ))}
          </View>
        );

      case 'Resources':
        return (
          <View>
            <Text className={`${textColor} text-[13px] font-black uppercase tracking-[2px] mb-6`}>Lesson Resources</Text>
            {RESOURCES.map((res) => (
              <TouchableOpacity key={res.id} className={`${cardGray} rounded-[24px] p-5 mb-4 flex-row items-center border-[1px] ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <View className={`w-12 h-12 rounded-2xl items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} mr-4`}>
                    <FileText size={22} color="#00FFB2" />
                </View>
                <View className="flex-1">
                  <Text className={`${textColor} text-sm font-black mb-1`}>{res.title}</Text>
                  <Text className={`${labelColor} text-[10px] font-bold uppercase`}>{res.type} • {res.size}</Text>
                </View>
                <TouchableOpacity className="w-10 h-10 items-center justify-center bg-[#00FFB2]/10 rounded-full">
                   <Download size={18} color="#00FFB2" strokeWidth={2.5} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'Transcript':
        return (
          <View className={`${cardGray} rounded-[32px] p-6 border-[1px] ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
             <View className="flex-row items-center mb-6">
                <Type size={18} color="#00FFB2" className="mr-3" />
                <Text className={`${textColor} text-[13px] font-black uppercase tracking-[2px] ml-2`}>Full Transcript</Text>
             </View>
             {TRANSCRIPT_DATA.map((t, idx) => (
               <View key={idx} className="flex-row mb-6">
                 <Text className="text-[#00FFB2] text-[11px] font-black mr-4 pt-0.5">{t.time}</Text>
                 <Text className={`${isDarkMode ? 'text-white/60' : 'text-black/60'} text-[13px] leading-[22px] flex-1 font-medium`}>
                    {t.text}
                 </Text>
               </View>
             ))}
          </View>
        );
    }
  };

  return (
    <Container className={`flex-1 ${appBg}`}>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* HEADER (LOCKED DARK) */}
        <View className={`flex-row items-center justify-between px-6 py-4 ${headerGray}`}>
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-xl border-[1px] bg-white/10 border-white/5 mr-3">
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-black uppercase tracking-widest">Atelier</Text>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="p-2 rounded-xl border-[1px] bg-white/10 border-white/5">
              <Bookmark size={20} color="white" strokeWidth={1.5} />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 rounded-xl border-[1px] bg-white/10 border-white/5">
              <Download size={20} color="white" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
          {/* VIDEO TERMINAL */}
          <View className="px-4 mb-8 pt-4">
            <View className={`aspect-video ${cardGray} rounded-[32px] overflow-hidden relative shadow-2xl`}>
              <ImageBackground 
                source={{ uri: 'https://images.unsplash.com/photo-1611974714658-94189381786e?q=80&w=800&auto=format&fit=crop' }}
                className="flex-1 opacity-40"
                resizeMode="cover"
              />
              
              {/* Overlay Elements */}
              <View className="absolute top-4 right-4 bg-black/40 px-3 py-1 rounded-md border border-white/10">
                <Text className="text-white/60 text-[9px] font-black uppercase tracking-widest">4K Ultra HD</Text>
              </View>

              <View className="absolute inset-0 items-center justify-center">
                <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center border border-white/20">
                  <View className="w-12 h-12 bg-[#3B82F6] rounded-full items-center justify-center">
                    <Play size={24} color="white" fill="white" />
                  </View>
                </View>
              </View>

              {/* Controls Bar */}
              <View className="absolute bottom-0 left-0 right-0 p-4">
                <View className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
                  <View className="h-full bg-[#00FFB2]" style={{ width: '65%' }} />
                </View>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4">
                    <Ionicons name="pause" size={20} color="white" />
                    <Volume2 size={18} color="white" />
                    <Text className="text-white/60 text-[11px] font-bold">12:45 / 19:30</Text>
                  </View>
                  <Maximize2 size={18} color="white" />
                </View>
              </View>
            </View>
          </View>

          {/* CONTENT DESCRIPTION */}
          <View className="px-6">
            <Text className="text-[#00FFB2] text-[10px] font-black uppercase tracking-[3px] mb-2">Module 04: Market Psychology</Text>
            <Text className={`${textColor} text-3xl font-black tracking-tight leading-[34px] mb-6`}>{title}</Text>
            
            {/* TABS */}
            <View className="flex-row border-b border-gray-400/10 mb-8">
              {['Notes', 'Resources', 'Transcript'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <TouchableOpacity 
                    key={tab} 
                    onPress={() => setActiveTab(tab)}
                    className="mr-8 pb-4 relative"
                  >
                    <Text className={`text-sm font-black tracking-wide ${isActive ? (isDarkMode ? 'text-white' : 'text-[#1F2937]') : (isDarkMode ? 'text-white/30' : 'text-black/30')}`}>
                       {tab}
                    </Text>
                    {isActive && <View className="absolute bottom-[-1px] left-0 right-0 h-1 bg-[#00FFB2] rounded-full" />}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* TAB CONTENT RENDERING */}
            {renderTabContent()}
          </View>
        </ScrollView>

        {/* CAPSULE NAVIGATION TERMINAL (GRAY THEMED) */}
        <View className="absolute bottom-10 left-6 right-6 z-50">
          <View className={`${navbarGray} rounded-full h-[88px] flex-row items-center px-4 border-[0.5px] ${isDarkMode ? 'border-white/10' : 'border-black/5'} shadow-2xl shadow-black/50`}>
            {/* PREV BUTTON */}
            <TouchableOpacity className="flex-1 items-center justify-center">
              <ChevronLeft size={20} color="white" strokeWidth={3} />
              <Text className="text-white/30 text-[8px] font-black uppercase mt-1 tracking-widest">Prev</Text>
            </TouchableOpacity>

            {/* CENTER PROGRESS TERMINAL */}
            <TouchableOpacity 
              activeOpacity={0.9}
              className="flex-[3] h-16 rounded-full flex-row items-center px-6 bg-white/5"
            >
              <View className="flex-1 items-center">
                <Text className="text-[#00FFB2] text-[8px] font-black uppercase tracking-[2px] mb-0.5">Course Progress</Text>
                <Text className="text-white text-[15px] font-black tracking-tight">65% Complete</Text>
              </View>
            </TouchableOpacity>

            {/* NEXT BUTTON */}
            <TouchableOpacity className="flex-1 items-center justify-center">
              <ChevronRight size={20} color="white" strokeWidth={3} />
              <Text className="text-white/30 text-[8px] font-black uppercase mt-1 tracking-widest">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default LessonPlayer;
