export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          name_fr: string;
          icon: string;
          description: string;
          order_index: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
      countries: {
        Row: {
          id: string;
          name: string;
          code: string;
          flag: string;
          capital: string;
          description: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['countries']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['countries']['Insert']>;
      };
      quotes: {
        Row: {
          id: string;
          text: string;
          text_original: string;
          language: string;
          translation: string;
          author: string;
          country_id: string | null;
          category: string;
          audio_url: string;
          is_featured: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quotes']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['quotes']['Insert']>;
      };
      heroes: {
        Row: {
          id: string;
          name: string;
          bio: string;
          birth_date: string;
          death_date: string;
          country_id: string | null;
          image_url: string;
          achievements: string;
          famous_quotes: string;
          video_url: string;
          is_featured: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['heroes']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['heroes']['Insert']>;
      };
      authors: {
        Row: {
          id: string;
          name: string;
          bio: string;
          birth_date: string;
          death_date: string;
          image_url: string;
          works: string;
          famous_quotes: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['authors']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['authors']['Insert']>;
      };
      articles: {
        Row: {
          id: string;
          title: string;
          content: string;
          summary: string;
          category: string;
          country_id: string | null;
          image_url: string;
          is_featured: boolean;
          views: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['articles']['Insert']>;
      };
      jokes: {
        Row: {
          id: string;
          text: string;
          country_id: string | null;
          category: string;
          likes: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['jokes']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['jokes']['Insert']>;
      };
      quiz_questions: {
        Row: {
          id: string;
          question: string;
          options: string[];
          correct_answer: string;
          explanation: string;
          category: string;
          difficulty: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quiz_questions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['quiz_questions']['Insert']>;
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          content_type: string;
          content_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['favorites']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['favorites']['Insert']>;
      };
    };
  };
}
