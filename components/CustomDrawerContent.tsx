/// <reference types="nativewind/types" />
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';
import { DrawerItem } from './DrawerItem';
import { Ionicons } from '@expo/vector-icons';
import { PanelLeftClose, ShieldCheck } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { state, navigation } = props;
  
  // Track which sidebar item was last clicked
  const [activeItem, setActiveItem] = React.useState('Home');

  // Get active route from nested navigators
  const rootIndex = state.index;
  const rootRoute = state.routes[rootIndex];
  
  // If we are in "Main" stack, we need to look deeper
  let activeTabName = '';
  if (rootRoute.name === 'Main') {
    const mainState: any = rootRoute.state;
    if (mainState) {
      const mainIndex = mainState.index;
      const mainRoute = mainState.routes[mainIndex];
      if (mainRoute.name === 'Tabs') {
        const tabState: any = mainRoute.state;
        if (tabState) {
          activeTabName = tabState.routes[tabState.index].name;
        }
      }
    }
  }

  // FORCE DARK MODE for navigation components
  const bgColor = 'bg-[#121212]';
  const textColor = 'text-white';
  const secondaryColor = 'text-[#888888]';

  const menuItems = [
    { label: 'Home', icon: 'home-outline', route: 'Main', screen: 'Tabs', params: { screen: 'Home' } },
    { label: 'Courses', icon: 'book-outline', route: 'Main', screen: 'Tabs', params: { screen: 'Courses' } },
    { label: 'Material', icon: 'library-outline', route: 'Main', screen: 'Material' },
    { label: 'Chat', icon: 'chatbubbles-outline', route: 'Main', screen: 'Tabs', params: { screen: 'ChatTab' } },
    { label: 'Tools', icon: 'construct-outline', route: 'Main', screen: 'Tabs', params: { screen: 'Tools' } },
    { label: 'Profile', icon: 'person-outline', route: 'Main', screen: 'Tabs', params: { screen: 'Profile', params: { initialTab: 0 } } },
    { label: 'Payments', icon: 'card-outline', route: 'Main', screen: 'Tabs', params: { screen: 'Profile', params: { initialTab: 1 } } },
    { label: 'Settings', icon: 'settings-outline', route: 'Main', screen: 'Tabs', params: { screen: 'Profile', params: { initialTab: 3 } } },
  ];

  // Profile sub-items that all route to the same tab
  const profileSubItems = ['Profile', 'Payments', 'Settings'];

  const getIsActive = (item: any) => {
    if (profileSubItems.includes(item.label)) {
      // For Profile sub-items, only highlight if this specific one was clicked
      return activeTabName === 'Profile' && activeItem === item.label;
    }
    
    // For Material (standalone screen)
    if (item.screen === 'Material') {
      return activeItem === 'Material';
    }

    // For regular tabs, match by tab name
    return activeTabName === item.params?.screen;
  };

  return (
    <View className={`flex-1 ${bgColor}`}>
      <SafeAreaView edges={['top', 'bottom']} className="flex-1">
        {/* HEADER SECTION - COMPACT DASHBOARD */}
        <View className="pt-4 pb-4 px-6 border-b border-gray-100 dark:border-white/5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 rounded-xl border-2 border-[#00FFB2]/30 overflow-hidden">
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop' }} 
                  className="w-full h-full"
                />
              </View>
              <View className="ml-3 flex-1">
                <Text className={`${textColor} text-lg font-extrabold`} numberOfLines={1}>Trader Alex</Text>
                <View className="flex-row items-center mt-0.5">
                  <View className="bg-[#00FFB2]/20 px-1.5 py-0.5 rounded-md mr-2">
                    <Text className="text-[#00FFB2] text-[9px] font-extrabold uppercase">GOLD</Text>
                  </View>
                  <Text className={`${secondaryColor} text-[10px]`} numberOfLines={1}>alex.trader@app.com</Text>
                </View>
              </View>
            </View>
            
            <View className="flex-row items-center">
              {/* THEME TOGGLE */}
              <TouchableOpacity 
                onPress={toggleTheme}
                className="p-2 mr-1"
              >
                <Ionicons 
                  name={isDarkMode ? "moon" : "sunny"} 
                  size={20} 
                  color={isDarkMode ? "#00FFB2" : "rgba(255,255,255,0.6)"} 
                />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => navigation.closeDrawer()}
                className="p-1 px-3"
              >
                <PanelLeftClose 
                  size={24} 
                  color="rgba(255,255,255,0.3)" 
                  strokeWidth={2} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* COMPACT UPGRADE BUTTON BAR */}
          <TouchableOpacity 
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Main', { screen: 'Subscription' });
            }}
            className="flex-row items-center justify-between bg-white/5 rounded-xl px-3 py-2 mt-4"
          >
            <Text className="text-[#888888] text-[10px] font-bold uppercase">Upgrade Tier</Text>
            <Ionicons name="arrow-forward-circle" size={18} color="#00FFB2" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-3 py-1">
        {menuItems.map((item, idx) => {
            return (
              <DrawerItem 
                key={idx}
                label={item.label}
                icon={item.icon as any}
                isActive={getIsActive(item)}
                onPress={() => {
                  setActiveItem(item.label);
                  navigation.closeDrawer();
                  
                  if (item.screen === 'Material') {
                    navigation.navigate('Main', { screen: 'Material' });
                  } else {
                    navigation.navigate('Main', { 
                      screen: 'Tabs', 
                      params: item.params 
                    });
                  }
                }}
              />
            );
          })}

          {/* COMPACT SUPPORT SECTION */}
          <View className="mt-2 pt-2 border-t border-white/5">
            <DrawerItem label="Help" icon="help-circle-outline" isActive={false} onPress={() => {}} />
            <DrawerItem label="Terms" icon="document-text-outline" isActive={false} onPress={() => {}} />
          </View>
        </View>

        {/* FOOTER */}
        <View className="px-6 py-4 border-t border-white/5 bg-[#121212]">
          <View className="flex-row justify-between items-center">
            <Text className="text-[#888888] text-[8px] font-bold tracking-widest opacity-40">TRUEICT V2.4 (G)</Text>
            <View className="flex-row items-center">
              <TouchableOpacity className="mr-3 opacity-30">
                <Ionicons name="logo-twitter" size={14} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="mr-3 opacity-30">
                <Ionicons name="logo-discord" size={14} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  navigation.closeDrawer();
                  useAuthStore.getState().setLogoutModalVisible(true);
                }}
                className="bg-red-500/10 p-1.5 rounded-md"
              >
                <Ionicons name="log-out-outline" size={14} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
