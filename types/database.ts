export interface Quote {
  id: string;
  text: string;
  text_original?: string;
  language?: string;
  translation?: string;
  author?: string;
  country_id?: string;
  category: 'african' | 'senegalese';
  audio_url?: string;
  is_featured: boolean;
  created_at: string;
}

export interface Hero {
  id: string;
  name: string;
  bio: string;
  birth_date?: string;
  death_date?: string;
  country_id?: string;
  image_url?: string;
  achievements?: string;
  famous_quotes?: string;
  video_url?: string;
  is_featured: boolean;
  created_at: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  birth_date?: string;
  death_date?: string;
  image_url?: string;
  works?: string;
  famous_quotes?: string;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: 'history' | 'secrets' | 'challenges';
  country_id?: string;
  image_url?: string;
  is_featured: boolean;
  views: number;
  created_at: string;
}

export interface Joke {
  id: string;
  text: string;
  country_id?: string;
  category: string;
  likes: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  capital: string;
  description: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  content_type: 'quote' | 'hero' | 'article' | 'joke';
  content_id: string;
  created_at: string;
}
