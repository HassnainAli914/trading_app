import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  Easing,
  interpolate
} from 'react-native-reanimated';
import { useThemeStore } from '../store/useThemeStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const TradingMotionBG: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 25000, // Balanced institutional movement
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const pulse1Style = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, -SCREEN_WIDTH * 2]);
    return {
      transform: [{ translateX }],
    };
  });

  const pulse2Style = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.5, 1], [0.1, 0.3, 0.1]);
    return { opacity };
  });

  const baseColor = isDarkMode ? '#030303' : '#F9F9F9';
  const gridColor = isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  
  // Institutional Market Colors (MATCHING CARD BG)
  const cardBGColor = '#1C1C1E';
  const upColor = isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const downColor = isDarkMode ? 'rgba(40, 40, 43, 0.35)' : 'rgba(0,0,0,0.08)';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: baseColor }]}>
      {/* LAYER 1: STATIC GRID */}
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        {[...Array(12)].map((_, i) => (
          <Rect key={`v-${i}`} x={(SCREEN_WIDTH / 12) * i} y="0" width="0.5" height="100%" fill={gridColor} />
        ))}
        {[...Array(24)].map((_, i) => (
          <Rect key={`h-${i}`} x="0" y={(SCREEN_HEIGHT / 24) * i} width="100%" height="0.5" fill={gridColor} />
        ))}
      </Svg>

      {/* LAYER 2: ANIMATED CANDLESTICKS (INSTITUTIONAL GRAY - REFINED) */}
      <Animated.View style={[{ width: SCREEN_WIDTH * 4, height: SCREEN_HEIGHT, flexDirection: 'row', alignItems: 'center' }, pulse1Style]}>
        {[...Array(80)].map((_, i) => {
          const h = 40 + Math.random() * 100;
          const marginTop = (Math.sin(i * 0.5) * 150);
          const isUp = i % 2 === 0;
          const color = isUp ? upColor : downColor;

          return (
            <View key={`c-${i}`} style={{ width: 40, alignItems: 'center', marginTop }}>
              {/* WICK */}
              <View style={{ width: 1.5, height: h + 30, backgroundColor: color, opacity: 0.15, position: 'absolute', top: -15 }} />
              {/* BODY */}
              <View 
                style={{ 
                  width: 20, 
                  height: h, 
                  backgroundColor: color, 
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: borderColor
                }} 
              />
            </View>
          );
        })}
      </Animated.View>

      {/* LAYER 3: MOMENTUM OVERLAY */}
      <Animated.View style={[StyleSheet.absoluteFill, pulse2Style, { pointerEvents: 'none' }]}>
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={isDarkMode ? "white" : "black"} stopOpacity="0.05" />
              <Stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </Animated.View>
    </View>
  );
};
