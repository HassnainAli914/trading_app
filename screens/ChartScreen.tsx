import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Platform, Animated, Pressable, ScrollView } from 'react-native';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { useThemeStore } from '../store/useThemeStore';
import { ChevronLeft, RotateCcw, Activity, Info, BarChart3, TrendingUp, Globe, Search, X, Target, Zap, Waves, Gem } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';
import Fuse from 'fuse.js';

// Dynamically import WebView only for Native
let WebView: any;
if (Platform.OS !== 'web') {
  WebView = require('react-native-webview').WebView;
}

const TWELVE_DATA_API_KEY = "demo"; // Note: For production use a real key

// Institutional symbols catalogue

const INSTITUTIONAL_ASSETS = [
  { id: '1', symbol: 'OANDA:XAUUSD', name: 'GOLD', category: 'Metals', icon: 'coronet', color: '#FFD700' },
  { id: '2', symbol: 'BINANCE:BTCUSDT', name: 'BTCUSDT', category: 'Crypto', icon: 'logo-bitcoin', color: '#F7931A' },
  { id: '3', symbol: 'FX_IDC:EURUSD', name: 'EURUSD', category: 'Forex', icon: 'logo-euro', color: '#2C5EAD' },
  { id: '4', symbol: 'FX_IDC:GBPUSD', name: 'GBPUSD', category: 'Forex', icon: 'cash-outline', color: '#00A651' },
  { id: '5', symbol: 'OANDA:XTIUSD', name: 'WTI OIL', category: 'Forex', icon: 'water', color: '#000000' },
  { id: '6', symbol: 'FOREXCOM:SPX500', name: 'S&P 500', category: 'Indices', icon: 'stats-chart', color: '#FF4D4D' },
  { id: '7', symbol: 'BINANCE:ETHUSDT', name: 'ETHUSDT', category: 'Crypto', icon: 'logo-ethereum', color: '#627EEA' },
];

export const ChartScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const [loading, setLoading] = useState(true);
  const [chartSymbol, setChartSymbol] = useState("OANDA:XAUUSD");
  const [chartKey, setChartKey] = useState(0);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dynamicAssets, setDynamicAssets] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const pulseAnim = useRef(new Animated.Value(0.4)).current;
  const pickerAnim = useRef(new Animated.Value(0)).current;
  const searchTimeout = useRef<any>(null);

  // Fuse configuration for fuzzy searching on local results
  const fuse = useMemo(() => new Fuse([...INSTITUTIONAL_ASSETS, ...dynamicAssets], {
    keys: ['name', 'symbol', 'instrument_name'],
    threshold: 0.4,
  }), [dynamicAssets]);

  // Global Search Engine (Twelve Data API)
  const fetchGlobalSymbols = async (query: string) => {
    if (!query || query.length < 2) {
      setDynamicAssets([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(`https://api.twelvedata.com/symbol_search?symbol=${query}&apikey=${TWELVE_DATA_API_KEY}`);
      if (response.data && response.data.data) {
        const mapped = response.data.data.map((item: any, index: number) => ({
          id: `dyn-${index}`,
          symbol: item.symbol,
          name: item.instrument_name || item.symbol,
          category: item.instrument_type || 'Asset',
          exchange: item.exchange,
          icon: mapAssetTypeToIcon(item.instrument_type),
          color: mapAssetTypeToColor(item.instrument_type),
          isDynamic: true,
        }));
        setDynamicAssets(mapped);
      }
    } catch (error) {
      console.warn("Global Search Error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const mapAssetTypeToIcon = (type: string) => {
    const t = (type || '').toLowerCase();
    if (t.includes('crypto')) return 'logo-bitcoin';
    if (t.includes('forex')) return 'globe-outline';
    if (t.includes('stock')) return 'bar-chart';
    if (t.includes('index')) return 'stats-chart';
    return 'cube-outline';
  };

  const mapAssetTypeToColor = (type: string) => {
    const t = (type || '').toLowerCase();
    if (t.includes('crypto')) return '#F7931A';
    if (t.includes('forex')) return '#2C5EAD';
    if (t.includes('stock')) return '#4ADE80';
    if (t.includes('index')) return '#FF4D4D';
    return '#A0A0A0';
  };

  // Debounced Search Trigger
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (searchQuery.length >= 2) {
      searchTimeout.current = setTimeout(() => fetchGlobalSymbols(searchQuery), 600);
    } else {
      setDynamicAssets([]);
    }
    return () => clearTimeout(searchTimeout.current);
  }, [searchQuery]);

  const filteredAssets = useMemo(() => {
    if (!searchQuery) return INSTITUTIONAL_ASSETS;
    return fuse.search(searchQuery).map((r: any) => r.item);
  }, [searchQuery, dynamicAssets]);

  // Pulse animation for the "LIVE" indicator
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 1000, useNativeDriver: Platform.OS !== 'web' }),
      ])
    ).start();
  }, []);

  const togglePicker = (open: boolean) => {
    setIsPickerOpen(open);
    Animated.spring(pickerAnim, {
      toValue: open ? 1 : 0,
      useNativeDriver: Platform.OS !== 'web',
      tension: 50,
      friction: 8,
    }).start();
  };

  // TradingView Widget Configuration
  const interval = "60";
  const theme = isDarkMode ? 'dark' : 'light';
  const toolbarBg = isDarkMode ? '#141414' : '#f1f3f6';

  const tradingViewHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body, html { margin: 0; padding: 0; height: 100%; width: 100%; background-color: ${isDarkMode ? '#0A0A0A' : '#FFFFFF'}; }
          #tradingview_widget { height: 100%; width: 100%; }
          .tradingview-widget-copyright { display: none !important; }
        </style>
      </head>
      <body>
        <div id="tradingview_widget"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">
          new TradingView.widget({
            "autosize": true,
            "symbol": "${chartSymbol}",
            "interval": "${interval}",
            "timezone": "Etc/UTC",
            "theme": "${theme}",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "${toolbarBg}",
            "enable_publishing": false,
            "hide_top_toolbar": false,
            "hide_legend": false,
            "save_image": false,
            "container_id": "tradingview_widget",
            "studies": [
              "RSI@tv-basicstudies",
              "MASimple@tv-basicstudies"
            ]
          });
        </script>
      </body>
    </html>
  `;

  // End of Asset Discovery Logics

  const translateY = pickerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-800, 0],
  });

  const backdropOpacity = pickerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  const renderWebChart = () => (
    <iframe
      key={`${chartSymbol}-${chartKey}`}
      style={{ border: 'none', width: '100%', height: '100%', backgroundColor: isDarkMode ? '#0A0A0A' : '#FFFFFF' }}
      srcDoc={tradingViewHtml}
      title="TradingView Chart"
      onLoad={() => setLoading(false)}
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );

  const renderNativeChart = () => {
    if (!WebView) return null;
    return (
      <WebView
        key={`${chartSymbol}-${chartKey}`}
        source={{ html: tradingViewHtml }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        className="flex-1"
        style={{ backgroundColor: isDarkMode ? '#0A0A0A' : '#FFFFFF' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onShouldStartLoadWithRequest={(request: any) => {
          if (request.url === 'about:blank' || request.url.startsWith('data:')) return true;
          return false;
        }}
      />
    );
  };

  const displaySymbol = INSTITUTIONAL_ASSETS.find(a => a.symbol === chartSymbol)?.name || chartSymbol.split(':')[1] || chartSymbol;

  return (
    <Container className="flex-1">
      <View className="z-50">
        <Header
          title={
            <TouchableOpacity 
              onPress={() => togglePicker(!isPickerOpen)}
              activeOpacity={0.7}
              className="flex-row items-center gap-2"
            >
              <Text className="text-white text-base font-black tracking-tight leading-5">{displaySymbol}</Text>
              <View className={`w-6 h-6 rounded-lg items-center justify-center ${isPickerOpen ? 'bg-[#00FFB2]' : 'bg-white/10'}`}>
                {isPickerOpen ? (
                  <X size={14} color="black" strokeWidth={3} />
                ) : (
                  <Search size={14} color="rgba(255,255,255,0.4)" strokeWidth={3} />
                )}
              </View>
            </TouchableOpacity>
          }
          subtitle="Live Market • 1H"
          leftControl={
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              className="p-2 rounded-xl border-[1px] bg-white/10 border-white/5 mr-3"
            >
              <ChevronLeft size={20} color="white" />
            </TouchableOpacity>
          }
          showSidebarTrigger={false}
          rightControl={
            <View className="flex-row items-center gap-2">
              <TouchableOpacity 
                className="p-2 rounded-xl border-[1px] bg-white/10 border-white/5"
                activeOpacity={0.7}
              >
                <TrendingUp size={20} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => {
                  setLoading(true);
                  setChartKey(prev => prev + 1);
                }} 
                activeOpacity={0.8}
                className="flex-row items-center gap-1.5 bg-[#22C55E] px-4 py-2.5 rounded-2xl"
              >
                <RotateCcw size={14} color="white" strokeWidth={2.5} />
                <Text className="text-white text-[11px] font-black uppercase tracking-tight">Sync</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      <View className="flex-1 relative">
        {/* BACKDROP OVERLAY */}
        {isPickerOpen && (
          <Pressable 
            style={StyleSheet.absoluteFill} 
            onPress={() => togglePicker(false)}
            className="z-40"
          >
             <Animated.View style={{ opacity: backdropOpacity }} className="flex-1 bg-black" />
          </Pressable>
        )}

        {/* ELITE TOP SHEET PICKER */}
        <Animated.View 
          style={{ transform: [{ translateY }] }}
          className={`absolute top-0 left-0 right-0 z-40 pb-8 rounded-b-[40px] bg-[#181818] shadow-2xl border-b border-white/5`}
        >
          <View className="px-6 pt-4">
            {/* SEARCH INTEGRATION */}
            <View className="flex-row items-center bg-white/5 px-5 h-14 rounded-2xl border-[1px] border-white/5 mb-6">
              <Search size={18} color="rgba(255,255,255,0.3)" />
              <TextInput
                placeholder="Find institutional markets..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                className="flex-1 ml-4 text-white font-bold text-sm"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ outlineStyle: 'none' } as any}
              />
            </View>

            <View className="flex-row items-center justify-between mb-4 mt-2">
              <Text className="text-white/20 text-[10px] font-black uppercase tracking-[3px]">
                Available Symbols
              </Text>
              {isSearching && (
                <View className="flex-row items-center gap-2">
                  <ActivityIndicator size="small" color="#00FFB2" />
                  <Text className="text-[#00FFB2] text-[10px] font-black uppercase tracking-widest">Searching Infinity...</Text>
                </View>
              )}
            </View>
            
            <View className="h-96">
              <FlatList
                data={filteredAssets}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const isActive = chartSymbol === item.symbol;
                  return (
                    <TouchableOpacity 
                      onPress={() => {
                        setChartSymbol(item.symbol);
                        togglePicker(false);
                        setLoading(true);
                      }}
                      className={`flex-row items-center justify-between p-4 rounded-2xl mb-2 border-[1.5px] ${
                        isActive 
                          ? 'bg-[#00FFB2]/10 border-[#00FFB2]' 
                          : 'bg-white/5 border-white/5'
                      }`}
                    >
                      <View className="flex-row items-center">
                        <View 
                          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <Ionicons name={item.icon as any} size={20} color={isActive ? '#00FFB2' : item.color} />
                        </View>
                        <View>
                          <Text className={`text-base font-black ${isActive ? 'text-[#00FFB2]' : 'text-white'}`}>{item.name}</Text>
                          <Text className="text-white/30 text-[9px] font-bold uppercase tracking-widest">{item.category}</Text>
                        </View>
                      </View>
                      {isActive && (
                        <View className="bg-[#00FFB2] w-5 h-5 rounded-full items-center justify-center">
                          <Ionicons name="checkmark" size={12} color="black" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Animated.View>

        {/* CHART CONTENT */}
        <View className="flex-1 overflow-hidden z-0">
          {Platform.OS === 'web' ? renderWebChart() : renderNativeChart()}

          {loading && (
            <View style={StyleSheet.absoluteFill} className="items-center justify-center bg-black/20 dark:bg-white/5" pointerEvents="none">
              <ActivityIndicator size="large" color="#00FFB2" />
              <Text className="mt-4 text-xs font-bold tracking-widest uppercase text-white/30">
                Initializing Terminal...
              </Text>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};
