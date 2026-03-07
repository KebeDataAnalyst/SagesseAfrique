/*
  # Sagesse d'Afrique - Database Schema

  ## Overview
  This migration creates the complete database schema for the Sagesse d'Afrique Internationale application,
  a platform for discovering African wisdom, history, and culture.

  ## New Tables

  ### 1. `categories`
  Main content categories (quotes, heroes, history, etc.)
  - `id` (uuid, primary key)
  - `name` (text) - Category name
  - `name_fr` (text) - French name
  - `icon` (text) - Icon name for UI
  - `description` (text) - Category description
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)

  ### 2. `countries`
  African countries for interactive map
  - `id` (uuid, primary key)
  - `name` (text) - Country name
  - `code` (text) - ISO country code
  - `flag` (text) - Flag emoji or URL
  - `capital` (text) - Capital city
  - `description` (text) - Brief description
  - `created_at` (timestamptz)

  ### 3. `quotes`
  African and Senegalese quotes and proverbs
  - `id` (uuid, primary key)
  - `text` (text) - Quote text
  - `text_original` (text) - Original language text (for Senegalese proverbs)
  - `language` (text) - Language (wolof, serere, pulaar, etc.)
  - `translation` (text) - French translation
  - `author` (text) - Author name
  - `country_id` (uuid) - Reference to countries
  - `category` (text) - Type: 'african', 'senegalese'
  - `audio_url` (text) - Audio pronunciation URL
  - `is_featured` (boolean) - Featured quote
  - `created_at` (timestamptz)

  ### 4. `heroes`
  African heroes and great figures
  - `id` (uuid, primary key)
  - `name` (text) - Hero name
  - `bio` (text) - Biography
  - `birth_date` (text) - Birth date
  - `death_date` (text) - Death date (nullable)
  - `country_id` (uuid) - Reference to countries
  - `image_url` (text) - Profile image URL
  - `achievements` (text) - Key achievements
  - `famous_quotes` (text) - Famous quotes
  - `video_url` (text) - Video link
  - `is_featured` (boolean) - Featured hero
  - `created_at` (timestamptz)

  ### 5. `authors`
  Senegalese authors and intellectuals
  - `id` (uuid, primary key)
  - `name` (text) - Author name
  - `bio` (text) - Biography
  - `birth_date` (text) - Birth date
  - `death_date` (text) - Death date (nullable)
  - `image_url` (text) - Profile image URL
  - `works` (text) - List of works
  - `famous_quotes` (text) - Famous quotes
  - `created_at` (timestamptz)

  ### 6. `articles`
  Historical articles, secrets, and challenges
  - `id` (uuid, primary key)
  - `title` (text) - Article title
  - `content` (text) - Article content
  - `summary` (text) - Brief summary
  - `category` (text) - Type: 'history', 'secrets', 'challenges'
  - `country_id` (uuid) - Related country (nullable)
  - `image_url` (text) - Featured image
  - `is_featured` (boolean) - Featured article
  - `views` (integer) - View count
  - `created_at` (timestamptz)

  ### 7. `jokes`
  African jokes and anecdotes
  - `id` (uuid, primary key)
  - `text` (text) - Joke text
  - `country_id` (uuid) - Related country (nullable)
  - `category` (text) - Joke category
  - `likes` (integer) - Like count
  - `created_at` (timestamptz)

  ### 8. `quiz_questions`
  Educational quiz questions
  - `id` (uuid, primary key)
  - `question` (text) - Question text
  - `options` (jsonb) - Answer options array
  - `correct_answer` (text) - Correct answer
  - `explanation` (text) - Explanation of answer
  - `category` (text) - Question category
  - `difficulty` (text) - easy, medium, hard
  - `created_at` (timestamptz)

  ### 9. `favorites`
  User favorites
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Reference to auth.users
  - `content_type` (text) - Type: 'quote', 'hero', 'article', 'joke'
  - `content_id` (uuid) - Reference to content
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public read access for content tables
  - Authenticated user access for favorites
  - Users can only manage their own favorites
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_fr text NOT NULL,
  icon text NOT NULL,
  description text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  flag text DEFAULT '',
  capital text DEFAULT '',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  text_original text DEFAULT '',
  language text DEFAULT '',
  translation text DEFAULT '',
  author text DEFAULT '',
  country_id uuid REFERENCES countries(id),
  category text DEFAULT 'african',
  audio_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create heroes table
CREATE TABLE IF NOT EXISTS heroes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text DEFAULT '',
  birth_date text DEFAULT '',
  death_date text DEFAULT '',
  country_id uuid REFERENCES countries(id),
  image_url text DEFAULT '',
  achievements text DEFAULT '',
  famous_quotes text DEFAULT '',
  video_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text DEFAULT '',
  birth_date text DEFAULT '',
  death_date text DEFAULT '',
  image_url text DEFAULT '',
  works text DEFAULT '',
  famous_quotes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text DEFAULT '',
  summary text DEFAULT '',
  category text DEFAULT 'history',
  country_id uuid REFERENCES countries(id),
  image_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create jokes table
CREATE TABLE IF NOT EXISTS jokes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  country_id uuid REFERENCES countries(id),
  category text DEFAULT '',
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  options jsonb DEFAULT '[]'::jsonb,
  correct_answer text NOT NULL,
  explanation text DEFAULT '',
  category text DEFAULT 'history',
  difficulty text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type text NOT NULL,
  content_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE heroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jokes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public content tables (read-only for everyone)
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view countries"
  ON countries FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view quotes"
  ON quotes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view heroes"
  ON heroes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view authors"
  ON authors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view articles"
  ON articles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view jokes"
  ON jokes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view quiz questions"
  ON quiz_questions FOR SELECT
  TO public
  USING (true);

-- RLS Policies for favorites (authenticated users only)
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert initial categories
INSERT INTO categories (name, name_fr, icon, description, order_index) VALUES
  ('quotes', 'Citations', 'quote', 'Citations africaines inspirantes', 1),
  ('senegalese', 'Citations Sénégalaises', 'message-square', 'Proverbes wolof, sérères, pulaar', 2),
  ('authors', 'Auteurs Sénégalais', 'book', 'Œuvres des intellectuels sénégalais', 3),
  ('history', 'Histoire d''Afrique', 'landmark', 'Empires et civilisations africaines', 4),
  ('heroes', 'Héros Africains', 'trophy', 'Grandes figures africaines', 5),
  ('secrets', 'Secrets d''Afrique', 'eye', 'Mystères et traditions africaines', 6),
  ('jokes', 'Blagues Africaines', 'smile', 'Humour et anecdotes culturelles', 7),
  ('challenges', 'Défis de l''Afrique', 'target', 'Développement et technologie', 8)
ON CONFLICT DO NOTHING;

-- Insert sample African countries
INSERT INTO countries (name, code, flag, capital) VALUES
  ('Sénégal', 'SN', '🇸🇳', 'Dakar'),
  ('Mali', 'ML', '🇲🇱', 'Bamako'),
  ('Ghana', 'GH', '🇬🇭', 'Accra'),
  ('Nigeria', 'NG', '🇳🇬', 'Abuja'),
  ('Afrique du Sud', 'ZA', '🇿🇦', 'Pretoria'),
  ('Kenya', 'KE', '🇰🇪', 'Nairobi'),
  ('Égypte', 'EG', '🇪🇬', 'Le Caire'),
  ('Éthiopie', 'ET', '🇪🇹', 'Addis-Abeba'),
  ('Burkina Faso', 'BF', '🇧🇫', 'Ouagadougou'),
  ('Congo', 'CG', '🇨🇬', 'Brazzaville')
ON CONFLICT DO NOTHING;