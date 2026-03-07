import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Quote, Hero, Article } from '@/types/database';
import { Quote as QuoteIcon, Trophy, BookOpen, Eye, Smile, Target } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [featuredHero, setFeaturedHero] = useState<Hero | null>(null);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [quotesRes, heroesRes, articlesRes] = await Promise.all([
        supabase.from('quotes').select('*').eq('is_featured', true).limit(1).maybeSingle(),
        supabase.from('heroes').select('*').eq('is_featured', true).limit(1).maybeSingle(),
        supabase.from('articles').select('*').eq('is_featured', true).limit(1).maybeSingle(),
      ]);

      if (quotesRes.data) setDailyQuote(quotesRes.data);
      if (heroesRes.data) setFeaturedHero(heroesRes.data);
      if (articlesRes.data) setFeaturedArticle(articlesRes.data);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Citations', icon: QuoteIcon, color: '#D97706', route: '/quotes' },
    { name: 'Héros', icon: Trophy, color: '#DC2626', route: '/heroes' },
    { name: 'Histoire', icon: BookOpen, color: '#2563EB', route: '/history' },
    { name: 'Secrets', icon: Eye, color: '#7C3AED', route: '/more' },
    { name: 'Blagues', icon: Smile, color: '#059669', route: '/more' },
    { name: 'Défis', icon: Target, color: '#DB2777', route: '/more' },
  ];

  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#D97706', '#F59E0B', '#FCD34D']} style={styles.header}>
        <Image
          source={require('@/assets/images/WhatsApp_Image_2026-03-07_at_02.15.14.jpeg')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Sagesse d'Afrique</Text>
        <Text style={styles.headerSubtitle}>Découvrez la richesse culturelle africaine</Text>
      </LinearGradient>

      {dailyQuote && (
        <View style={styles.quoteCard}>
          <View style={styles.quoteHeader}>
            <QuoteIcon size={24} color="#D97706" />
            <Text style={styles.quoteLabel}>Citation du jour</Text>
          </View>
          <Text style={styles.quoteText}>{dailyQuote.text}</Text>
          {dailyQuote.author && (
            <Text style={styles.quoteAuthor}>— {dailyQuote.author}</Text>
          )}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryCard, { borderLeftColor: category.color }]}
              activeOpacity={0.7}
              onPress={() => handleCategoryPress(category.route)}>
              <category.icon size={28} color={category.color} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {featuredHero && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Héros du jour</Text>
          <TouchableOpacity style={styles.heroCard} activeOpacity={0.7}>
            <ImageBackground
              source={{ uri: featuredHero.image_url || 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg' }}
              style={styles.heroImage}
              imageStyle={styles.heroImageStyle}>
              <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.heroGradient}>
                <Text style={styles.heroName}>{featuredHero.name}</Text>
                <Text style={styles.heroDate} numberOfLines={1}>
                  {featuredHero.birth_date} - {featuredHero.death_date || 'Présent'}
                </Text>
              </LinearGradient>
            </ImageBackground>
            {featuredHero.bio && (
              <Text style={styles.heroBio} numberOfLines={3}>
                {featuredHero.bio}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {featuredArticle && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Article vedette</Text>
          <TouchableOpacity style={styles.articleCard} activeOpacity={0.7}>
            <Text style={styles.articleTitle}>{featuredArticle.title}</Text>
            <Text style={styles.articleSummary} numberOfLines={3}>
              {featuredArticle.summary}
            </Text>
            <Text style={styles.readMore}>Lire la suite →</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.95,
    textAlign: 'center',
  },
  quoteCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#D97706',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quoteLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D97706',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1F2937',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
  },
  section: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  heroImage: {
    height: 200,
    width: '100%',
  },
  heroImageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  heroName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroDate: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  heroBio: {
    padding: 16,
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  articleSummary: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6B7280',
    marginBottom: 12,
  },
  readMore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D97706',
  },
});
