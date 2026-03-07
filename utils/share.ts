import * as Sharing from 'expo-sharing';
import { Platform, Share } from 'react-native';

export async function shareContent(title: string, message: string) {
  try {
    if (Platform.OS === 'web') {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: message,
        });
      } else {
        await Share.share({
          message: `${title}\n\n${message}`,
        });
      }
    } else {
      await Share.share({
        title: title,
        message: `${title}\n\n${message}`,
      });
    }
  } catch (error) {
    console.error('Error sharing:', error);
  }
}

export function shareQuote(text: string, author?: string) {
  const message = author ? `"${text}"\n\n— ${author}` : `"${text}"`;
  shareContent('Citation de Sagesse d\'Afrique', message);
}

export function shareHero(name: string, bio: string) {
  const message = `${name}\n\n${bio}`;
  shareContent('Héros Africain', message);
}

export function shareArticle(title: string, summary: string) {
  const message = `${title}\n\n${summary}`;
  shareContent('Article - Sagesse d\'Afrique', message);
}
