import React, { useState, useRef, useEffect } from 'react';
import { FlatList, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Container } from '../components/Container';
import { MessageBubble } from '../components/MessageBubble';
import { ChatInput } from '../components/ChatInput';
import { ConversationHeader } from '../components/ConversationHeader';
import { useThemeStore } from '../store/useThemeStore';

const DUMMY_MESSAGES = [
  { id: '6', text: 'Smart. Better safe than sorry on these high volatility days.', time: '10:08 AM', isSender: true },
  { id: '5', text: 'That sounds like a solid plan. I am sitting on hands for now.', time: '10:06 AM', isSender: false },
  { id: '4', text: 'I am looking for a short on EURUSD if it hits 1.0820.', time: '10:05 AM', isSender: true },
  { id: '3', text: 'Exactly. Markets are reacting pretty sharply. DXY is pumping.', time: '10:03 AM', isSender: false },
  { id: '2', text: 'Yeah, it was higher than expected. Inflation is still sticky.', time: '10:02 AM', isSender: true },
  { id: '1', text: 'Hey, did you see the CPI data that just came out?', time: '10:00 AM', isSender: false },
];

export const ConversationScreen = ({ navigation, route }: any) => {
  const { isDarkMode } = useThemeStore();
  const { name, id } = route.params || { name: 'Community Chat', id: '1' };
  
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [status, setStatus] = useState('Online');
  const flatListRef = useRef<FlatList>(null);

  // Simulate typing status for realism
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('Typing...');
      setTimeout(() => setStatus('Online'), 3000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  return (
    <Container className="flex-1">
      {/* CUSTOM IMMERSIVE HEADER */}
      <ConversationHeader 
        name={name}
        status={status}
        avatarUrl={`https://i.pravatar.cc/150?u=${id}`}
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        className="flex-1"
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          inverted
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble
              message={item.text}
              time={item.time}
              isSender={item.isSender}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
        
        <ChatInput onSend={handleSend} />
      </KeyboardAvoidingView>
    </Container>
  );
};
