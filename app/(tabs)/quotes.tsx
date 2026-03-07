import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Quote } from '@/types/database';
import { Search, Heart, Share2, Volume2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { shareQuote } from '@/utils/share';

export default function QuotesScreen() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'african' | 'senegalese'>('african');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuotes();
  }, [activeTab]);

  useEffect(() => {
    filterQuotes();
  }, [searchQuery, quotes]);

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('category', activeTab)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterQuotes = () => {
    if (!searchQuery.trim()) {
      setFilteredQuotes(quotes);
      return;
    }

    const filtered = quotes.filter(
      quote =>
        quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.author?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuotes(filtered);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#D97706', '#F59E0B']} style={styles.header}>
        <Image
          source={require('@/assets/images/WhatsApp_Image_2026-03-07_at_02.15.14.jpeg')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Citations</Text>
        <Text style={styles.headerSubtitle}>Sagesse africaine</Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une citation..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'african' && styles.activeTab]}
          onPress={() => setActiveTab('african')}>
          <Text style={[styles.tabText, activeTab === 'african' && styles.activeTabText]}>
            Citations Africaines
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'senegalese' && styles.activeTab]}
          onPress={() => setActiveTab('senegalese')}>
          <Text style={[styles.tabText, activeTab === 'senegalese' && styles.activeTabText]}>
            Proverbes Sénégalais
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : filteredQuotes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune citation trouvée</Text>
          </View>
        ) : (
          filteredQuotes.map((quote, index) => (
            <View key={quote.id} style={styles.quoteCard}>
              {quote.text_original && (
                <>
                  <Text style={styles.quoteOriginal}>{quote.text_original}</Text>
                  {quote.language && (
                    <Text style={styles.quoteLanguage}>({quote.language})</Text>
                  )}
                </>
              )}
              <Text style={styles.quoteText}>{quote.text}</Text>
              {quote.author && (
                <Text style={styles.quoteAuthor}>— {quote.author}</Text>
              )}
              <View style={styles.quoteActions}>
                {quote.audio_url && (
                  <TouchableOpacity style={styles.actionButton}>
                    <Volume2 size={18} color="#6B7280" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.actionButton}>
                  <Heart size={18} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => shareQuote(quote.text, quote.author)}>
                  <Share2 size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 24,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.95,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#D97706',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  quoteCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#D97706',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quoteOriginal: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#4B5563',
    marginBottom: 4,
  },
  quoteLanguage: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 17,
    lineHeight: 26,
    color: '#1F2937',
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'right',
    marginBottom: 12,
  },
  quoteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    padding: 4,
  },
});
