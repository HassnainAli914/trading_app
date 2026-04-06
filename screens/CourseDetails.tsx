/// <reference types="nativewind/types" />
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Container } from '../components/Container';
import { CourseHeader } from '../components/CourseHeader';
import { InfoCard } from '../components/InfoCard';
import { LessonItem } from '../components/LessonItem';
import { InstructorCard } from '../components/InstructorCard';
import { ReviewCard } from '../components/ReviewCard';
import { PrimaryGradientButton } from '../components/PrimaryGradientButton';
import { useThemeStore } from '../store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

// --- Dummy Data ---
const COURSE_DETAILS = {
  id: '1',
  title: 'Advanced Crypto Trading',
  description: 'Master the markets with advanced technical analysis, order flow patterns, and risk management strategies used by institutional traders. This course covers everything from liquidity pools to complex stop-loss management and portfolio hedging in volatile markets.\n\nLearn to read what the big players are doing and position yourself for maximum profit while minimizing exposure. Whether you are a beginner looking to skip the learning curve or an experienced trader seeking for an edge, this syllabus is designed to level up your game.',
  imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=800&auto=format&fit=crop',
  rating: 4.9,
  students: '12,540',
  duration: '5h 30m',
  lessonsCount: 18,
  level: 'Advanced',
  instructor: {
    name: 'David Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
    bio: 'Professional trader with 10+ years of experience in high-frequency trading and algorithmic strategy development.',
  },
  lessons: [
    { id: '1', title: 'Market Structure & Liquidity', duration: '15:20' },
    { id: '2', title: 'Order Flow Breakdown', duration: '22:45' },
    { id: '3', title: 'Institutional Trading vs Retail', duration: '10:30' },
    { id: '4', title: 'Advanced Risk Assessment', duration: '18:15' },
    { id: '5', title: 'Psychology of the Big Trade', duration: '12:00' },
  ],
  reviews: [
    { id: '1', userName: 'John D.', avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop', rating: 5, comment: 'Hands down the best course I have taken. The order flow section is a game changer.', time: '2 days ago' },
    { id: '2', userName: 'Sarah K.', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', rating: 4, comment: 'Very deep and detailed. Requires focus but worth every penny.', time: '1 week ago' },
  ]
};

export const CourseDetails = ({ navigation }: any) => {
  const { isDarkMode } = useThemeStore();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-[#888888]' : 'text-[#555555]';

  return (
    <Container className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* COURSE HEADER */}
        <CourseHeader 
          title={COURSE_DETAILS.title}
          description={COURSE_DETAILS.description}
          imageUrl={COURSE_DETAILS.imageUrl}
          rating={COURSE_DETAILS.rating}
          students={COURSE_DETAILS.students}
          onBack={() => navigation.goBack()}
        />

        <View className="px-4 py-6">
          {/* INFO CARDS */}
          <View className="flex-row justify-between mb-8">
            <InfoCard icon="book-outline" label="Lessons" value={COURSE_DETAILS.lessonsCount.toString()} className="mr-2" />
            <InfoCard icon="time-outline" label="Duration" value={COURSE_DETAILS.duration} className="mr-2" />
            <InfoCard icon="bar-chart-outline" label="Level" value={COURSE_DETAILS.level} />
          </View>

          {/* DESCRIPTION */}
          <View className="mb-8">
            <Text className={`${textColor} text-xl font-bold mb-3`}>About Course</Text>
            <Text 
              className={`${secondaryColor} text-sm leading-6`}
              numberOfLines={isExpanded ? undefined : 3}
            >
              {COURSE_DETAILS.description}
            </Text>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} className="mt-2 text-[#00FFB2]">
              <Text className="text-[#00FFB2] font-bold">{isExpanded ? 'Read Less' : 'Read More'}</Text>
            </TouchableOpacity>
          </View>

          {/* INSTRUCTOR */}
          <View className="mb-8">
            <Text className={`${textColor} text-xl font-bold mb-3`}>Instructor</Text>
            <InstructorCard 
              name={COURSE_DETAILS.instructor.name}
              avatarUrl={COURSE_DETAILS.instructor.avatarUrl}
              bio={COURSE_DETAILS.instructor.bio}
            />
          </View>

          {/* CURRICULUM */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className={`${textColor} text-xl font-bold`}>Lessons</Text>
              <Text className="text-[#00FFB2] font-bold">{COURSE_DETAILS.lessons.length} Lessons</Text>
            </View>
            
            {COURSE_DETAILS.lessons.map((lesson, idx) => (
              <LessonItem 
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                isLocked={!isEnrolled && idx > 0} // Lock all but first lesson if not enrolled
                onPress={() => navigation.navigate('LessonPlayer', { id: lesson.id, title: lesson.title })}
              />
            ))}
          </View>

          {/* REVIEWS */}
          <View className="mb-24">
            <Text className={`${textColor} text-xl font-bold mb-4`}>Reviews</Text>
            {COURSE_DETAILS.reviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM BUTTON */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white/5 dark:bg-black/5" style={{ backgroundColor: isDarkMode ? 'rgba(10,10,10,0.9)' : 'rgba(255,255,255,0.9)' }}>
        <PrimaryGradientButton 
          title={isEnrolled ? "Continue Learning" : "Enroll Now"} 
          onPress={() => isEnrolled ? navigation.navigate('LessonPlayer', { id: '1', title: 'Market Structure' }) : setIsEnrolled(true)}
        />
      </View>
    </Container>
  );
};

export default CourseDetails;
