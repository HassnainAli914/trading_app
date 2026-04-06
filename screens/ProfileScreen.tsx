import React, { useState } from 'react';
import { View, Text, useWindowDimensions, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Container } from '../components/Container';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';
import { ProfileHeader } from '../components/ProfileHeader';
import { InfoItem } from '../components/InfoItem';
import { PaymentCard } from '../components/PaymentCard';
import { CourseMiniCard } from '../components/CourseMiniCard';
import { Ionicons } from '@expo/vector-icons';
import { PanelLeftOpen } from 'lucide-react-native';
import { darkTheme, lightTheme } from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';

// --- Dummy Data ---
const USER_PROFILE = {
  name: 'Trader Alex',
  email: 'alex.trader@tradingcourse.com',
  avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
  stats: {
    courses: 4,
    completed: 2,
    progress: '68%',
  },
  role: 'Student (Elite Member)',
};

const PAYMENTS_DATA = [
  { id: '1', courseName: 'Advanced Crypto Trading', amount: '$199.00', date: 'Oct 12, 2025', status: 'Paid' },
  { id: '2', courseName: 'Forex Mastery 101', amount: '$149.00', date: 'Sep 05, 2025', status: 'Paid' },
  { id: '3', courseName: 'Trading Masterclass VIP', amount: '$499.00', date: 'Aug 20, 2025', status: 'Pending' },
];

const ENROLLED_COURSES = [
  { id: '1', title: 'Advanced Crypto Trading', progress: 85, imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=200&auto=format&fit=crop' },
  { id: '2', title: 'Forex Mastery 101', progress: 45, imageUrl: 'https://images.unsplash.com/photo-1611974714658-94189381786e?q=80&w=200&auto=format&fit=crop' },
  { id: '3', title: 'Price Action Foundations', progress: 100, imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=200&auto=format&fit=crop' },
  { id: '4', title: 'Scalping Mastery', progress: 20, imageUrl: 'https://images.unsplash.com/photo-1622790694515-6d5955a15372?q=80&w=200&auto=format&fit=crop' },
];

// --- Tab Scenes ---
const InfoTab = () => (
  <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
    <InfoItem label="Full Name" value={USER_PROFILE.name} />
    <InfoItem label="Email Address" value={USER_PROFILE.email} />
    <InfoItem label="Role" value={USER_PROFILE.role} />
    <TouchableOpacity className="bg-white mt-4 h-16 rounded-full items-center justify-center shadow-2xl shadow-white/10">
      <Text className="text-black text-xs font-black uppercase tracking-widest">Edit Profile</Text>
    </TouchableOpacity>
    <View className="h-40" />
  </ScrollView>
);

const PaymentsTab = () => (
  <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
    {PAYMENTS_DATA.map((payment) => (
      <PaymentCard key={payment.id} {...payment as any} />
    ))}
    <View className="h-40" />
  </ScrollView>
);

const CoursesTab = () => (
  <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
    {ENROLLED_COURSES.map((course) => (
      <CourseMiniCard key={course.id} {...course} />
    ))}
    <View className="h-40" />
  </ScrollView>
);

const SettingsTab = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const cardBg = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white';

  return (
    <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
      <View className={`flex-row justify-between items-center p-6 rounded-[32px] mb-4 border border-white/5 ${cardBg}`}>
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-2xl bg-white/5 items-center justify-center mr-4">
            <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={20} color="white" />
          </View>
          <Text className={`font-black tracking-tight ${textColor}`}>Dark Mode</Text>
        </View>
        <Switch 
          value={isDarkMode} 
          onValueChange={toggleTheme} 
          trackColor={{ false: '#333', true: '#FFF' }}
          thumbColor={isDarkMode ? '#000' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity className={`flex-row items-center p-6 rounded-[32px] mb-4 border border-white/5 ${cardBg}`}>
        <View className="w-10 h-10 rounded-2xl bg-white/5 items-center justify-center mr-4">
          <Ionicons name="notifications" size={20} color="white" />
        </View>
        <Text className={`font-black tracking-tight ${textColor}`}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity className={`flex-row items-center p-6 rounded-[32px] mb-4 border border-white/5 ${cardBg}`}>
        <View className="w-10 h-10 rounded-2xl bg-white/5 items-center justify-center mr-4">
          <Ionicons name="lock-closed" size={20} color="white" />
        </View>
        <Text className={`font-black tracking-tight ${textColor}`}>Privacy & Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => useAuthStore.getState().setLogoutModalVisible(true)}
        className="bg-red-500/10 p-6 rounded-[32px] items-center flex-row justify-center mt-6 border border-red-500/10"
      >
        <Ionicons name="log-out-outline" size={24} color="#EF4444" className="mr-3" />
        <Text className="text-red-500 font-black uppercase tracking-widest text-xs">Sign Out</Text>
      </TouchableOpacity>
      <View className="h-40" />
    </ScrollView>
  );
};

export const ProfileScreen = ({ navigation, route }: any) => {
  const { isDarkMode } = useThemeStore();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'info', title: 'Info' },
    { key: 'payments', title: 'Payments' },
    { key: 'courses', title: 'Courses' },
    { key: 'settings', title: 'Settings' },
  ]);

  // Handle deep-linking to specific tabs
  React.useEffect(() => {
    if (route.params?.initialTab !== undefined) {
      setIndex(route.params.initialTab);
      navigation.setParams({ initialTab: undefined });
    }
  }, [route.params?.initialTab]);

  const renderScene = SceneMap({
    info: InfoTab,
    payments: PaymentsTab,
    courses: CoursesTab,
    settings: SettingsTab,
  });

  return (
    <Container className="flex-1">
      <Header
        title="Settings"
        subtitle="Manage Profile"
        onLeftPress={() => (navigation as any).openDrawer()}
        rightControl={
          <TouchableOpacity className="p-2.5 rounded-2xl bg-white/5 border border-white/5" activeOpacity={0.7}>
            <Ionicons name="ellipsis-horizontal" size={20} color="white" />
          </TouchableOpacity>
        }
      />

      <ProfileHeader 
        name={USER_PROFILE.name} 
        email={USER_PROFILE.email} 
        avatarUrl={USER_PROFILE.avatarUrl} 
        stats={USER_PROFILE.stats} 
      />
      
      <View className="flex-1">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props: any) => (
            <TabBar
              {...props}
              scrollEnabled
              indicatorStyle={{ backgroundColor: 'white', height: 2 }}
              style={{ 
                backgroundColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255,255,255,0.05)',
                marginHorizontal: 16,
              }}
              tabStyle={{ width: 'auto', minWidth: 100, height: 50 }}
              renderLabel={({ route, focused }: { route: any, focused: boolean }) => (
                <Text className={`text-[10px] font-black uppercase tracking-[2px] ${focused ? 'text-white' : 'text-white/40'}`}>
                  {route.title}
                </Text>
              )}
            />
          )}
        />
      </View>
    </Container>
  );
};
