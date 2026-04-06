import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../store/useThemeStore';

interface TabItem {
  name: string;
  label: string;
  iconFocused: string;
  iconOutline: string;
}

const TABS: TabItem[] = [
  { name: 'Home', label: 'Home', iconFocused: 'home', iconOutline: 'home-outline' },
  { name: 'Courses', label: 'Courses', iconFocused: 'book', iconOutline: 'book-outline' },
  { name: 'ChatTab', label: 'Chat', iconFocused: 'chatbubbles', iconOutline: 'chatbubbles-outline' },
  { name: 'Tools', label: 'Tools', iconFocused: 'construct', iconOutline: 'construct-outline' },
];

import { BlurView } from 'expo-blur';

const AnimatedTab = ({ isFocused, tab, onPress }: {
  isFocused: boolean;
  tab: TabItem;
  onPress: () => void;
}) => {
  const widthAnim = useRef(new Animated.Value(isFocused ? 110 : 50)).current;
  const opacityAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(widthAnim, {
        toValue: isFocused ? 110 : 50,
        friction: 8,
        tension: 100,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 250,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [isFocused]);

  const iconName = isFocused ? tab.iconFocused : tab.iconOutline;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="items-center justify-center h-12 mx-1"
    >
      <Animated.View
        style={{ width: widthAnim }}
        className={`h-11 rounded-full flex-row items-center justify-center ${
          isFocused ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
      >
        <Ionicons
          name={iconName as any}
          size={20}
          color={isFocused ? '#000000' : 'rgba(255,255,255,0.45)'}
        />
        {isFocused && (
          <Animated.Text
            style={{ opacity: opacityAnim }}
            className="ml-2 text-black text-[11px] font-black tracking-tight"
            numberOfLines={1}
          >
            {tab.label}
          </Animated.Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View
      className="absolute bottom-10 left-6 right-6 h-16 rounded-full overflow-hidden border border-white/10"
      style={{
        elevation: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
      }}
    >
      <BlurView 
        intensity={80} 
        tint="dark" 
        className="flex-1 flex-row items-center justify-evenly px-2"
      >
        {state.routes.map((route: any, index: number) => {
          const tab = TABS.find((t) => t.name === route.name);
          if (!tab) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <AnimatedTab
              key={route.key}
              isFocused={isFocused}
              tab={tab}
              onPress={onPress}
            />
          );
        })}
      </BlurView>
    </View>
  );
};
