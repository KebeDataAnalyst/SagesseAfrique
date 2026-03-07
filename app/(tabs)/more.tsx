import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Author, Article, Joke, QuizQuestion } from '@/types/database';
import { Book, Eye, Smile, Target, Brain, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Section = 'authors' | 'secrets' | 'jokes' | 'challenges' | 'quiz' | null;

export default function MoreScreen() {
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [secrets, setSecrets] = useState<Article[]>([]);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [challenges, setChallenges] = useState<Article[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeSection) {
      loadSectionContent(activeSection);
    }
  }, [activeSection]);

  const loadSectionContent = async (section: Section) => {
    if (!section) return;

    try {
      setLoading(true);
      switch (section) {
        case 'authors':
          const { data: authorsData } = await supabase
            .from('authors')
            .select('*')
            .order('name', { ascending: true });
          setAuthors(authorsData || []);
          break;
        case 'secrets':
          const { data: secretsData } = await supabase
            .from('articles')
            .select('*')
            .eq('category', 'secrets')
            .order('created_at', { ascending: false });
          setSecrets(secretsData || []);
          break;
        case 'jokes':
          const { data: jokesData } = await supabase
            .from('jokes')
            .select('*')
            .order('likes', { ascending: false });
          setJokes(jokesData || []);
          break;
        case 'challenges':
          const { data: challengesData } = await supabase
            .from('articles')
            .select('*')
            .eq('category', 'challenges')
            .order('created_at', { ascending: false });
          setChallenges(challengesData || []);
          break;
        case 'quiz':
          const { data: quizData } = await supabase
            .from('quiz_questions')
            .select('*')
            .order('created_at', { ascending: false });
          setQuizQuestions(quizData || []);
          break;
      }
    } catch (error) {
      console.error('Error loading section content:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'authors' as Section, title: 'Auteurs Sénégalais', icon: Book, color: '#D97706', description: 'Découvrez les grands écrivains' },
    { id: 'secrets' as Section, title: 'Secrets d\'Afrique', icon: Eye, color: '#7C3AED', description: 'Mystères et traditions' },
    { id: 'jokes' as Section, title: 'Blagues Africaines', icon: Smile, color: '#059669', description: 'Humour et anecdotes' },
    { id: 'challenges' as Section, title: 'Défis de l\'Afrique', icon: Target, color: '#DB2777', description: 'Développement et avenir' },
    { id: 'quiz' as Section, title: 'Quiz Africain', icon: Brain, color: '#2563EB', description: 'Testez vos connaissances' },
  ];

  if (activeSection === null) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#7C3AED', '#8B5CF6']} style={styles.header}>
          <Image
            source={require('@/assets/images/WhatsApp_Image_2026-03-07_at_02.15.14.jpeg')}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>Plus</Text>
          <Text style={styles.headerSubtitle}>Explorez la culture africaine</Text>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { borderLeftColor: item.color }]}
              activeOpacity={0.7}
              onPress={() => setActiveSection(item.id)}>
              <View style={styles.menuIconContainer}>
                <item.icon size={28} color={item.color} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#8B5CF6']} style={styles.header}>
        <TouchableOpacity onPress={() => setActiveSection(null)} style={styles.backButton}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {menuItems.find(item => item.id === activeSection)?.title}
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : (
          <>
            {activeSection === 'authors' && authors.map(author => (
              <View key={author.id} style={styles.card}>
                <Text style={styles.cardTitle}>{author.name}</Text>
                {author.birth_date && (
                  <Text style={styles.cardDate}>
                    {author.birth_date} - {author.death_date || 'Présent'}
                  </Text>
                )}
                <Text style={styles.cardText}>{author.bio}</Text>
                {author.works && (
                  <>
                    <Text style={styles.cardSubtitle}>Œuvres</Text>
                    <Text style={styles.cardText}>{author.works}</Text>
                  </>
                )}
              </View>
            ))}

            {activeSection === 'secrets' && secrets.map(secret => (
              <View key={secret.id} style={styles.card}>
                <Text style={styles.cardTitle}>{secret.title}</Text>
                <Text style={styles.cardText}>{secret.summary}</Text>
                <Text style={styles.cardContent}>{secret.content}</Text>
              </View>
            ))}

            {activeSection === 'jokes' && jokes.map(joke => (
              <View key={joke.id} style={styles.jokeCard}>
                <Smile size={24} color="#059669" style={styles.jokeIcon} />
                <Text style={styles.jokeText}>{joke.text}</Text>
                <Text style={styles.jokeLikes}>❤️ {joke.likes} j'aime</Text>
              </View>
            ))}

            {activeSection === 'challenges' && challenges.map(challenge => (
              <View key={challenge.id} style={styles.card}>
                <Text style={styles.cardTitle}>{challenge.title}</Text>
                <Text style={styles.cardText}>{challenge.summary}</Text>
                <Text style={styles.cardContent}>{challenge.content}</Text>
              </View>
            ))}

            {activeSection === 'quiz' && quizQuestions.map((question, index) => (
              <View key={question.id} style={styles.quizCard}>
                <Text style={styles.quizNumber}>Question {index + 1}</Text>
                <Text style={styles.quizQuestion}>{question.question}</Text>
                <View style={styles.quizOptions}>
                  {question.options.map((option, i) => (
                    <TouchableOpacity key={i} style={styles.quizOption}>
                      <Text style={styles.quizOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.quizDifficulty}>
                  Difficulté: {question.difficulty}
                </Text>
              </View>
            ))}
          </>
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
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.95,
    marginTop: 4,
    textAlign: 'center',
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuIconContainer: {
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    lineHeight: 24,
    color: '#374151',
    marginTop: 8,
  },
  jokeCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  jokeIcon: {
    marginBottom: 12,
  },
  jokeText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#1F2937',
    marginBottom: 12,
  },
  jokeLikes: {
    fontSize: 13,
    color: '#6B7280',
  },
  quizCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quizNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  quizQuestion: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    lineHeight: 26,
  },
  quizOptions: {
    gap: 10,
  },
  quizOption: {
    backgroundColor: '#F3F4F6',
    padding: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  quizOptionText: {
    fontSize: 14,
    color: '#1F2937',
  },
  quizDifficulty: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 12,
    textTransform: 'capitalize',
  },
});
