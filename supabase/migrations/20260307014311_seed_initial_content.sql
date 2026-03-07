/*
  # Seed Initial Content

  ## Overview
  This migration adds sample content to populate the Sagesse d'Afrique application with
  inspiring quotes, heroes, articles, and other cultural content.

  ## Content Added
  1. African quotes and proverbs
  2. Senegalese proverbs (Wolof, Pulaar, Sérère)
  3. Famous African heroes
  4. Senegalese authors
  5. Historical articles
  6. African jokes
  7. Quiz questions
*/

-- Insert African quotes
INSERT INTO quotes (text, author, category, is_featured) VALUES
  ('Si tu veux aller vite, marche seul. Si tu veux aller loin, marchons ensemble.', 'Proverbe africain', 'african', true),
  ('L''arbre qui tombe fait plus de bruit que la forêt qui pousse.', 'Proverbe africain', 'african', true),
  ('Celui qui a planté un arbre avant de mourir n''a pas vécu inutilement.', 'Proverbe africain', 'african', false),
  ('Un seul doigt ne peut pas ramasser un caillou.', 'Proverbe africain', 'african', false),
  ('Quand on a un bon voisin, on n''a pas besoin de clôture.', 'Proverbe africain', 'african', false),
  ('La sagesse est un baobab, mais personne ne peut en faire le tour.', 'Proverbe africain', 'african', false),
  ('L''éducation d''un peuple se mesure à sa manière de traiter les femmes.', 'Nelson Mandela', 'african', true),
  ('Nous devons être les maîtres de notre propre destin.', 'Thomas Sankara', 'african', true),
  ('Le colonialisme n''est pas une machine à penser.', 'Aimé Césaire', 'african', false),
  ('L''Afrique écrira sa propre histoire, et elle sera au nord et au sud du Sahara, une histoire de gloire et de dignité.', 'Kwame Nkrumah', 'african', false)
ON CONFLICT DO NOTHING;

-- Insert Senegalese proverbs (Wolof)
INSERT INTO quotes (text, text_original, language, translation, category) VALUES
  ('Yàlla du jaay móor.', 'Yàlla du jaay móor', 'wolof', 'Dieu ne vend personne.', 'senegalese'),
  ('Nit, nit ay garabam.', 'Nit, nit ay garabam', 'wolof', 'L''homme est le remède de l''homme.', 'senegalese'),
  ('Ku amul sag, amul doom.', 'Ku amul sag, amul doom', 'wolof', 'Qui n''a pas d''oncle maternel, n''a pas d''enfant.', 'senegalese'),
  ('Kenn du tudd sa doom.', 'Kenn du tudd sa doom', 'wolof', 'Personne n''enterre son enfant.', 'senegalese'),
  ('Ndaw yi taxaw ci sunu biir.', 'Ndaw yi taxaw ci sunu biir', 'wolof', 'Les jeunes sont notre avenir.', 'senegalese'),
  ('Kulukki amul tulli.', 'Kulukki amul tulli', 'pulaar', 'La patience n''a pas de limite.', 'senegalese'),
  ('Neddo waɗii hakkille makko.', 'Neddo waɗii hakkille makko', 'pulaar', 'L''homme fait sa propre intelligence.', 'senegalese')
ON CONFLICT DO NOTHING;

-- Insert African heroes
INSERT INTO heroes (name, bio, birth_date, death_date, image_url, achievements, famous_quotes, is_featured) VALUES
  (
    'Thomas Sankara',
    'Révolutionnaire burkinabè, président du Burkina Faso de 1983 à 1987. Surnommé le "Che Guevara africain", il a mené une politique révolutionnaire axée sur l''anti-impérialisme, l''émancipation des femmes et le développement autocentré.',
    '1949',
    '1987',
    'https://images.pexels.com/photos/18148912/pexels-photo-18148912.jpeg',
    'Campagne d''alphabétisation massive, Plantation de 10 millions d''arbres, Vaccination de 2,5 millions d''enfants, Émancipation des femmes',
    'Nous devons être les maîtres de notre propre destin. L''esclave qui n''est pas capable d''assumer sa révolte ne mérite pas que l''on s''apitoie sur son sort.',
    true
  ),
  (
    'Nelson Mandela',
    'Leader anti-apartheid et premier président noir d''Afrique du Sud (1994-1999). Prix Nobel de la Paix en 1993. Symbole de la lutte contre l''oppression raciale et pour la réconciliation.',
    '1918',
    '2013',
    'https://images.pexels.com/photos/18148913/pexels-photo-18148913.jpeg',
    'Fin de l''apartheid, Réconciliation nationale, Prix Nobel de la Paix, Constitution démocratique',
    'L''éducation est l''arme la plus puissante qu''on puisse utiliser pour changer le monde.',
    true
  ),
  (
    'Cheikh Anta Diop',
    'Historien, anthropologue, physicien et homme politique sénégalais. Pionnier dans la démonstration de l''origine africaine de l''Égypte ancienne et de la civilisation.',
    '1923',
    '1986',
    'https://images.pexels.com/photos/18148914/pexels-photo-18148914.jpeg',
    'Nations nègres et culture, Antériorité des civilisations nègres, Laboratoire de datation au carbone 14',
    'L''Afrique sera le théâtre de la renaissance de l''humanité.',
    true
  ),
  (
    'Kwame Nkrumah',
    'Leader indépendantiste et premier président du Ghana (1960-1966). Père du panafricanisme moderne, il a œuvré pour l''unité africaine.',
    '1909',
    '1972',
    'https://images.pexels.com/photos/18148915/pexels-photo-18148915.jpeg',
    'Indépendance du Ghana, Panafricanisme, Organisation de l''Unité Africaine',
    'Nous devons unir nos efforts pour atteindre l''indépendance économique totale.',
    false
  ),
  (
    'Wangari Maathai',
    'Militante écologiste et politique kényane. Première femme africaine à recevoir le Prix Nobel de la Paix en 2004 pour sa contribution au développement durable.',
    '1940',
    '2011',
    'https://images.pexels.com/photos/18148916/pexels-photo-18148916.jpeg',
    'Mouvement de la Ceinture Verte, 51 millions d''arbres plantés, Prix Nobel de la Paix',
    'Jusqu''à ce que vous creusiez un trou, plantiez un arbre, l''arrosiez et le fassiez survivre, vous n''avez rien fait. Vous parlez juste.',
    false
  )
ON CONFLICT DO NOTHING;

-- Insert Senegalese authors
INSERT INTO authors (name, bio, birth_date, death_date, works, famous_quotes) VALUES
  (
    'Léopold Sédar Senghor',
    'Poète, écrivain et homme d''État sénégalais. Premier président du Sénégal (1960-1980). Co-fondateur du mouvement de la Négritude avec Aimé Césaire.',
    '1906',
    '2001',
    'Chants d''ombre, Hosties noires, Éthiopiques, Nocturnes',
    'La culture est au début et à la fin du développement.'
  ),
  (
    'Cheikh Anta Diop',
    'Historien, anthropologue et physicien. Ses travaux ont révolutionné la compréhension de l''histoire africaine.',
    '1923',
    '1986',
    'Nations nègres et culture, L''Unité culturelle de l''Afrique noire, Antériorité des civilisations nègres',
    'L''Afrique aura un destin comparable à celui de l''Europe.'
  ),
  (
    'Ousmane Sembène',
    'Cinéaste et écrivain sénégalais, considéré comme le père du cinéma africain. Ses œuvres dénoncent le colonialisme et les injustices sociales.',
    '1923',
    '2007',
    'Le Docker noir, Ô pays, mon beau peuple, Les Bouts de bois de Dieu, Xala',
    'Le cinéma est l''école du soir pour le peuple africain.'
  ),
  (
    'Mariama Bâ',
    'Écrivaine sénégalaise, figure majeure de la littérature africaine francophone. Ses romans traitent de la condition féminine en Afrique.',
    '1929',
    '1981',
    'Une si longue lettre, Un chant écarlate',
    'La femme africaine doit apprendre à s''accepter elle-même.'
  )
ON CONFLICT DO NOTHING;

-- Insert historical articles
INSERT INTO articles (title, summary, content, category, is_featured) VALUES
  (
    'L''Empire du Mali (1235-1600)',
    'Un des plus grands empires d''Afrique de l''Ouest, célèbre pour sa richesse et son rayonnement culturel.',
    'L''Empire du Mali fut fondé par Soundiata Keïta en 1235. À son apogée sous Kankou Moussa, il contrôlait les routes commerciales de l''or et du sel. Tombouctou devint un centre intellectuel majeur avec l''université de Sankoré. L''empire était renommé pour sa justice, son administration et son rayonnement culturel à travers le monde musulman.',
    'history',
    true
  ),
  (
    'L''Empire du Ghana (300-1200)',
    'Premier grand empire ouest-africain, maître du commerce transsaharien.',
    'L''Empire du Ghana, appelé Wagadou par ses habitants, fut le premier grand empire d''Afrique de l''Ouest. Situé entre le Sahara et les forêts tropicales, il contrôlait le commerce de l''or et du sel. Sa capitale, Koumbi Saleh, était une métropole cosmopolite. L''empire développa un système administratif sophistiqué et une armée puissante.',
    'history',
    false
  ),
  (
    'Les Mystères des Pyramides Nubiennes',
    'Plus nombreuses que les pyramides égyptiennes, les pyramides du Soudan restent méconnues.',
    'Le royaume de Koush au Soudan compte plus de 220 pyramides, soit plus que l''Égypte. Ces structures, plus petites mais plus pentues, témoignent d''une civilisation puissante qui domina même l''Égypte pendant un siècle. Les pharaons noirs de la 25e dynastie ont laissé un héritage architectural remarquable à Méroé et Napata.',
    'secrets',
    true
  ),
  (
    'Le Défi de la Technologie en Afrique',
    'Comment l''Afrique peut devenir un leader de l''innovation technologique mondiale.',
    'L''Afrique possède la population la plus jeune du monde et un potentiel technologique immense. Des hubs d''innovation émergent à Lagos, Nairobi, Kigali et Accra. Les défis incluent l''accès à l''électricité, la formation, le financement et les infrastructures. Mais les solutions de mobile banking (M-Pesa) et les start-ups africaines montrent la voie.',
    'challenges',
    true
  )
ON CONFLICT DO NOTHING;

-- Insert African jokes
INSERT INTO jokes (text, category) VALUES
  ('Un Africain dit à son ami : "Mon grand-père a vécu 120 ans !" Son ami répond : "C''est rien, mon village a 500 ans et il est toujours debout !"', 'humour'),
  ('Pourquoi les Africains ne jouent jamais à cache-cache dans la forêt ? Parce que personne ne trouve jamais les animaux !', 'humour'),
  ('Un touriste demande : "Combien de temps pour aller au village ?" Le guide répond : "Ça dépend de tes jambes, mon ami !"', 'anecdote')
ON CONFLICT DO NOTHING;

-- Insert quiz questions
INSERT INTO quiz_questions (question, options, correct_answer, explanation, category, difficulty) VALUES
  (
    'Qui était le premier président du Sénégal indépendant ?',
    '["Léopold Sédar Senghor", "Abdou Diouf", "Abdoulaye Wade", "Macky Sall"]',
    'Léopold Sédar Senghor',
    'Léopold Sédar Senghor fut le premier président du Sénégal de 1960 à 1980. Poète et intellectuel, il fut aussi l''un des fondateurs du mouvement de la Négritude.',
    'history',
    'easy'
  ),
  (
    'Quel empire africain était dirigé par Soundiata Keïta ?',
    '["Empire du Mali", "Empire du Ghana", "Empire Songhaï", "Empire du Kanem"]',
    'Empire du Mali',
    'Soundiata Keïta fonda l''Empire du Mali en 1235 après la bataille de Kirina. Il est célébré dans l''épopée de Soundiata.',
    'history',
    'medium'
  ),
  (
    'Que signifie "Nit, nit ay garabam" en wolof ?',
    '["L''homme est le remède de l''homme", "La patience est une vertu", "L''union fait la force", "Dieu est grand"]',
    'L''homme est le remède de l''homme',
    'Ce proverbe wolof souligne l''importance de la solidarité et de l''entraide entre les humains.',
    'culture',
    'medium'
  ),
  (
    'Qui a reçu le Prix Nobel de la Paix en 1993 ?',
    '["Nelson Mandela", "Thomas Sankara", "Kwame Nkrumah", "Patrice Lumumba"]',
    'Nelson Mandela',
    'Nelson Mandela et Frederik de Klerk ont partagé le Prix Nobel de la Paix en 1993 pour leur rôle dans la fin pacifique de l''apartheid.',
    'history',
    'easy'
  )
ON CONFLICT DO NOTHING;