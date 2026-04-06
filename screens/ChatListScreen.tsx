import React from 'react';
import { FlatList, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Container } from '../components/Container';
import { ChatListItem } from '../components/ChatListItem';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { PanelLeftOpen } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';

const CHATS_DATA = [
  {
    id: '1',
    name: 'Crypto Alpha Community',
    lastMessage: 'Check the new analysis on BTC daily chart!',
    time: '12:45 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=200&auto=format&fit=crop',
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'John Trader',
    lastMessage: 'Are you entering that gold trade today?',
    time: '11:20 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Forex Secrets Elite',
    lastMessage: 'New signal: EURUSD Sell at 1.08500',
    time: 'Yesterday',
    avatarUrl: 'https://images.unsplash.com/photo-1611974714658-94189381786e?q=80&w=200&auto=format&fit=crop',
    unreadCount: 12,
  },
  {
    id: '4',
    name: 'Stock Market Weekly',
    lastMessage: 'Earnings report summary for Q1 is ready.',
    time: 'Yesterday',
    avatarUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=200&auto=format&fit=crop',
    unreadCount: 0,
  },
];

export const ChatListScreen = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const searchBg = isDarkMode ? 'bg-dark-secondary' : 'bg-[#F0F0F0]';
  const placeholderColor = isDarkMode ? '#A0A0A0' : '#888888';

  const filteredChats = React.useMemo(() => {
    return CHATS_DATA.filter((chat) => 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
  return (
    <Container className="flex-1">
      <Header
        title="Messages"
        subtitle="Community Hub"
        onLeftPress={() => (navigation as any).openDrawer()}
        rightControl={
          <TouchableOpacity className="p-2 bg-white/10 rounded-xl border-[1px] border-white/5">
            <Ionicons name="create-outline" size={20} color="white" />
          </TouchableOpacity>
        }
      />

      {/* SEARCH TERMINAL (LOCKED DARK) */}
      <View className="px-4 pt-4 pb-2 bg-[#121212]">
        <View className="flex-row items-center px-4 h-11 rounded-2xl w-full border-[0.5px] bg-white/5 border-white/20">
          <Ionicons name="search-sharp" size={17} color="rgba(255,255,255,0.4)" />
          <TextInput
            placeholder="Search conversations..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            className="flex-1 ml-3 h-full text-xs font-semibold text-white"
            value={searchQuery}
            onChangeText={setSearchQuery}
            selectionColor="#00FFB2"
            style={{ outlineStyle: 'none' } as any}
          />
        </View>
      </View>

      <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1">
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatListItem
              name={item.name}
              lastMessage={item.lastMessage}
              time={item.time}
              avatarUrl={item.avatarUrl}
              unreadCount={item.unreadCount}
              onPress={() => navigation.navigate('Conversation', { id: item.id, name: item.name })}
            />
          )}
          ListHeaderComponent={() => (
            <View className="px-4 pt-4 pb-2">
              <Text className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#888888]' : 'text-[#AAAAAA]'}`}>
                Recent Conversations
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-20 mt-10">
              <Ionicons name="chatbubbles-outline" size={60} color={placeholderColor} />
              <Text className={`${placeholderColor} mt-4 text-center px-8 text-base`}>
                No messages found.
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    </Container>
  );
};
