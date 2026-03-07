import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, TextInput, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Hero } from '@/types/database';
import { Search, Heart, Share2, Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { shareHero } from '@/utils/share';

export default function HeroesScreen() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedHero, setExpandedHero] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHeroes();
  }, []);

  useEffect(() => {
    filterHeroes();
  }, [searchQuery, heroes]);

  const loadHeroes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('heroes')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('name', { ascending: true });

      if (error) throw error;
      setHeroes(data || []);
    } catch (error) {
      console.error('Error loading heroes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterHeroes = () => {
    if (!searchQuery.trim()) {
      setFilteredHeroes(heroes);
      return;
    }

    const filtered = heroes.filter(hero =>
      hero.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHeroes(filtered);
  };

  const toggleExpand = (heroId: string) => {
    setExpandedHero(expandedHero === heroId ? null : heroId);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#DC2626', '#EF4444']} style={styles.header}>
        <Image
          source={require('@/assets/images/WhatsApp_Image_2026-03-07_at_02.15.14.jpeg')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Héros Africains</Text>
        <Text style={styles.headerSubtitle}>Grandes figures de l'histoire</Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un héros..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : filteredHeroes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun héros trouvé</Text>
          </View>
        ) : (
          filteredHeroes.map(hero => (
            <TouchableOpacity
              key={hero.id}
              style={styles.heroCard}
              activeOpacity={0.9}
              onPress={() => toggleExpand(hero.id)}>
              <ImageBackground
                source={{ uri: hero.image_url || 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg' }}
                style={styles.heroImage}
                imageStyle={styles.heroImageStyle}>
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.85)']} style={styles.heroGradient}>
                  <Text style={styles.heroName}>{hero.name}</Text>
                  <Text style={styles.heroDate}>
                    {hero.birth_date} - {hero.death_date || 'Présent'}
                  </Text>
                </LinearGradient>
              </ImageBackground>

              {expandedHero === hero.id && (
                <View style={styles.heroDetails}>
                  {hero.bio && (
                    <>
                      <Text style={styles.detailTitle}>Biographie</Text>
                      <Text style={styles.detailText}>{hero.bio}</Text>
                    </>
                  )}

                  {hero.achievements && (
                    <>
                      <Text style={styles.detailTitle}>Réalisations</Text>
                      <Text style={styles.detailText}>{hero.achievements}</Text>
                    </>
                  )}

                  {hero.famous_quotes && (
                    <>
                      <Text style={styles.detailTitle}>Citations célèbres</Text>
                      <Text style={styles.detailQuote}>{hero.famous_quotes}</Text>
                    </>
                  )}

                  <View style={styles.heroActions}>
                    {hero.video_url && (
                      <TouchableOpacity style={styles.actionButton}>
                        <Play size={18} color="#DC2626" />
                        <Text style={styles.actionButtonText}>Vidéo</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.actionButton}>
                      <Heart size={18} color="#DC2626" />
                      <Text style={styles.actionButtonText}>Favori</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => shareHero(hero.name, hero.bio)}>
                      <Share2 size={18} color="#DC2626" />
                      <Text style={styles.actionButtonText}>Partager</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
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
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
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
    padding: 20,
  },
  heroName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroDate: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  heroDetails: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  detailQuote: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    fontStyle: 'italic',
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
  },
  heroActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
});
