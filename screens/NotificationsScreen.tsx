import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, Animated } from 'react-native';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { useThemeStore } from '../store/useThemeStore';
import { 
  BookOpen, MessageSquare, CreditCard, FileText, 
  TrendingUp, ChevronLeft, CheckCheck, BellOff, 
  LayoutGrid
} from 'lucide-react-native';

// --- Types ---
interface Notification {
  id: string;
  type: 'course' | 'message' | 'payment' | 'assignment' | 'market';
  title: string;
  message: string;
  time: string;
  read: boolean;
  group: 'today' | 'yesterday' | 'earlier';
}

// --- Tab Config ---
const TABS = [
  { key: 'all', label: 'All', icon: LayoutGrid },
  { key: 'course', label: 'Courses', icon: BookOpen },
  { key: 'message', label: 'Messages', icon: MessageSquare },
  { key: 'payment', label: 'Payments', icon: CreditCard },
  { key: 'assignment', label: 'Tasks', icon: FileText },
  { key: 'market', label: 'Market', icon: TrendingUp },
];

// --- Dummy Data ---
const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'course', title: 'New Lesson Available', message: 'New lesson added to Forex Mastery — "Advanced Order Blocks"', time: '15m ago', read: false, group: 'today' },
  { id: '2', type: 'market', title: 'Bullish Breakout Alert', message: 'Gold (XAUUSD) shows bullish breakout above key resistance level', time: '1h ago', read: false, group: 'today' },
  { id: '3', type: 'message', title: 'New Group Message', message: 'New message in Trading Group from @MasterTrader', time: '2h ago', read: false, group: 'today' },
  { id: '4', type: 'payment', title: 'Payment Confirmed', message: 'Payment successful for Advanced ICT Course — $49.99', time: '5h ago', read: true, group: 'today' },
  { id: '5', type: 'assignment', title: 'Assignment Reviewed', message: 'Your "Market Structure" assignment has been reviewed — 92/100', time: '1d ago', read: true, group: 'yesterday' },
  { id: '6', type: 'course', title: 'Course Updated', message: 'Price Action Masterclass module 3 has been updated', time: '1d ago', read: true, group: 'yesterday' },
  { id: '7', type: 'market', title: 'Market Weekly Recap', message: 'Key takeaways from this week\'s volatile market action', time: '1d ago', read: false, group: 'yesterday' },
  { id: '8', type: 'message', title: 'Mentor Response', message: 'Your mentor replied to your question about liquidity sweeps', time: '3d ago', read: true, group: 'earlier' },
  { id: '9', type: 'payment', title: 'Subscription Renewed', message: 'Your monthly Pro subscription has been renewed', time: '5d ago', read: true, group: 'earlier' },
  { id: '10', type: 'assignment', title: 'New Assignment', message: 'A new assignment "Fair Value Gaps" has been posted', time: '1w ago', read: true, group: 'earlier' },
];

// --- Icon Config ---
const NOTIFICATION_CONFIG: Record<string, { icon: any; bgColor: string; iconColor: string }> = {
  course: { icon: BookOpen, bgColor: 'bg-blue-500/10', iconColor: '#3B82F6' },
  message: { icon: MessageSquare, bgColor: 'bg-purple-500/10', iconColor: '#A855F7' },
  payment: { icon: CreditCard, bgColor: 'bg-[#22C55E]/10', iconColor: '#22C55E' },
  assignment: { icon: FileText, bgColor: 'bg-amber-500/10', iconColor: '#F59E0B' },
  market: { icon: TrendingUp, bgColor: 'bg-rose-500/10', iconColor: '#EF4444' },
};

// --- Tab Bar Component ---
const NotifTabBar = ({ activeTab, onTabPress, isDarkMode, notifications }: {
  activeTab: string;
  onTabPress: (key: string) => void;
  isDarkMode: boolean;
  notifications: Notification[];
}) => {
  return (
    <View className={`border-b ${isDarkMode ? 'border-white/[0.04]' : 'border-black/[0.04]'}`}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 6 }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.key;
          const TabIcon = tab.icon;
          const count = tab.key === 'all' 
            ? notifications.filter(n => !n.read).length 
            : notifications.filter(n => n.type === tab.key && !n.read).length;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.7}
              className={`flex-row items-center px-3.5 py-2 rounded-xl border-[1.5px] ${
                isActive
                  ? 'bg-[#22C55E]/10 border-[#22C55E]/20'
                  : isDarkMode 
                    ? 'bg-white/[0.03] border-white/[0.05]' 
                    : 'bg-black/[0.02] border-black/[0.04]'
              }`}
            >
              <TabIcon 
                size={14} 
                color={isActive ? '#22C55E' : isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'} 
                strokeWidth={2.5} 
              />
              <Text className={`text-[11px] font-bold ml-1.5 ${
                isActive 
                  ? 'text-[#22C55E]' 
                  : isDarkMode ? 'text-white/30' : 'text-black/25'
              }`}>
                {tab.label}
              </Text>
              {count > 0 && (
                <View className={`ml-1.5 px-1.5 py-0.5 rounded-md ${isActive ? 'bg-[#22C55E]/20' : isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                  <Text className={`text-[9px] font-black ${isActive ? 'text-[#22C55E]' : isDarkMode ? 'text-white/40' : 'text-black/30'}`}>
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

// --- NotificationItem Component ---
const NotificationItem = ({ item, onPress, isDarkMode }: { item: Notification; onPress: () => void; isDarkMode: boolean }) => {
  const config = NOTIFICATION_CONFIG[item.type];
  const IconComponent = config.icon;

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.6}
      className={`flex-row items-start p-4 mx-4 mb-2 rounded-2xl ${
        !item.read 
          ? isDarkMode ? 'bg-white/[0.04]' : 'bg-[#22C55E]/[0.03]'
          : ''
      }`}
    >
      {/* Icon */}
      <View className={`w-11 h-11 rounded-2xl items-center justify-center ${config.bgColor} mr-3.5`}>
        <IconComponent size={20} color={config.iconColor} strokeWidth={2} />
      </View>

      {/* Content */}
      <View className="flex-1 mr-2">
        <Text 
          className={`text-[13px] mb-1 ${
            !item.read 
              ? isDarkMode ? 'text-white font-black' : 'text-black font-black'
              : isDarkMode ? 'text-white/70 font-bold' : 'text-black/70 font-bold'
          }`}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text 
          className={`text-[12px] leading-[17px] ${
            !item.read
              ? isDarkMode ? 'text-white/50 font-medium' : 'text-black/40 font-medium'
              : isDarkMode ? 'text-white/25 font-normal' : 'text-black/25 font-normal'
          }`}
          numberOfLines={2}
        >
          {item.message}
        </Text>
        <Text className={`text-[10px] mt-1.5 font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/15' : 'text-black/15'}`}>
          {item.time}
        </Text>
      </View>

      {/* Unread Indicator */}
      {!item.read && (
        <View className="w-2.5 h-2.5 rounded-full bg-[#22C55E] mt-1.5" />
      )}
    </TouchableOpacity>
  );
};

// --- SectionHeader Component ---
const NotifSectionHeader = ({ title, isDarkMode }: { title: string; isDarkMode: boolean }) => (
  <View className="px-6 pt-5 pb-2">
    <Text className={`text-[10px] font-black uppercase tracking-[2px] ${isDarkMode ? 'text-white/20' : 'text-black/15'}`}>
      {title}
    </Text>
  </View>
);

// --- EmptyState Component ---
const EmptyState = ({ activeTab, isDarkMode }: { activeTab: string; isDarkMode: boolean }) => {
  const tabLabel = TABS.find(t => t.key === activeTab)?.label || 'notifications';
  return (
    <View className="flex-1 items-center justify-center py-20">
      <View className={`w-20 h-20 rounded-3xl items-center justify-center mb-6 ${isDarkMode ? 'bg-white/5' : 'bg-black/[0.03]'}`}>
        <BellOff size={36} color={isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'} strokeWidth={1.5} />
      </View>
      <Text className={`text-lg font-black mb-2 ${isDarkMode ? 'text-white/30' : 'text-black/20'}`}>
        All Caught Up
      </Text>
      <Text className={`text-sm font-medium text-center px-12 leading-5 ${isDarkMode ? 'text-white/15' : 'text-black/12'}`}>
        No {activeTab === 'all' ? '' : tabLabel.toLowerCase() + ' '}notifications right now.
      </Text>
    </View>
  );
};

// --- Grouped List Component ---
const GroupedList = ({ notifications, isDarkMode, onItemPress }: { 
  notifications: Notification[]; 
  isDarkMode: boolean;
  onItemPress: (id: string) => void;
}) => {
  const todayItems = notifications.filter(n => n.group === 'today');
  const yesterdayItems = notifications.filter(n => n.group === 'yesterday');
  const earlierItems = notifications.filter(n => n.group === 'earlier');

  return (
    <>
      {todayItems.length > 0 && (
        <View>
          <NotifSectionHeader title="Today" isDarkMode={isDarkMode} />
          {todayItems.map(item => (
            <NotificationItem key={item.id} item={item} isDarkMode={isDarkMode} onPress={() => onItemPress(item.id)} />
          ))}
        </View>
      )}
      {yesterdayItems.length > 0 && (
        <View>
          <NotifSectionHeader title="Yesterday" isDarkMode={isDarkMode} />
          {yesterdayItems.map(item => (
            <NotificationItem key={item.id} item={item} isDarkMode={isDarkMode} onPress={() => onItemPress(item.id)} />
          ))}
        </View>
      )}
      {earlierItems.length > 0 && (
        <View>
          <NotifSectionHeader title="Earlier" isDarkMode={isDarkMode} />
          {earlierItems.map(item => (
            <NotificationItem key={item.id} item={item} isDarkMode={isDarkMode} onPress={() => onItemPress(item.id)} />
          ))}
        </View>
      )}
    </>
  );
};

// --- Main Screen ---
export const NotificationsScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <Container className="flex-1">
      <Header
        title="Notifications"
        showSidebarTrigger={false}
        leftControl={
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="p-2 rounded-xl border-[1px] bg-white/10 border-white/5"
          >
            <ChevronLeft size={20} color="white" />
          </TouchableOpacity>
        }
        rightControl={
          unreadCount > 0 ? (
            <TouchableOpacity 
              onPress={markAllAsRead}
              className="flex-row items-center gap-1.5 bg-white/10 px-3 py-2 rounded-xl"
              activeOpacity={0.7}
            >
              <CheckCheck size={14} color="white" strokeWidth={2.5} />
              <Text className="text-white text-[9px] font-black uppercase tracking-wider">Read All</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      {/* Tab Bar */}
      <NotifTabBar 
        activeTab={activeTab} 
        onTabPress={setActiveTab} 
        isDarkMode={isDarkMode}
        notifications={notifications}
      />

      {/* Content */}
      {filteredNotifications.length === 0 ? (
        <EmptyState activeTab={activeTab} isDarkMode={isDarkMode} />
      ) : (
        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor="#22C55E"
              colors={['#22C55E']}
            />
          }
        >
          <GroupedList 
            notifications={filteredNotifications} 
            isDarkMode={isDarkMode} 
            onItemPress={markAsRead} 
          />
        </ScrollView>
      )}
    </Container>
  );
};
