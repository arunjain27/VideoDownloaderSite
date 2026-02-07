import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'hero.title': 'Download Videos from Any Platform',
      'hero.subtitle': 'Fast, free, and easy video downloader supporting YouTube, TikTok, Instagram and more',
      'input.placeholder': 'Paste video URL here...',
      'platforms.title': 'Supported Platforms',
    },
  },
  es: {
    translation: {
      'hero.title': 'Descarga Videos de Cualquier Plataforma',
      'hero.subtitle': 'Descargador de videos rápido, gratuito y fácil que soporta YouTube, TikTok, Instagram y más',
      'input.placeholder': 'Pega la URL del video aquí...',
      'platforms.title': 'Plataformas Soportadas',
    },
  },
  hi: {
    translation: {
      'hero.title': 'किसी भी प्लेटफॉर्म से वीडियो डाउनलोड करें',
      'hero.subtitle': 'तेज़, मुफ्त और आसान वीडियो डाउनलोडर जो YouTube, TikTok, Instagram और अधिक का समर्थन करता है',
      'input.placeholder': 'वीडियो URL यहाँ पेस्ट करें...',
      'platforms.title': 'समर्थित प्लेटफॉर्म',
    },
  },
  ar: {
    translation: {
      'hero.title': 'تحميل الفيديوهات من أي منصة',
      'hero.subtitle': 'أداة تحميل فيديو سريعة ومجانية وسهلة تدعم YouTube و TikTok و Instagram والمزيد',
      'input.placeholder': 'الصق رابط الفيديو هنا...',
      'platforms.title': 'المنصات المدعومة',
    },
  },
  pt: {
    translation: {
      'hero.title': 'Baixe Vídeos de Qualquer Plataforma',
      'hero.subtitle': 'Downloader de vídeo rápido, gratuito e fácil que suporta YouTube, TikTok, Instagram e mais',
      'input.placeholder': 'Cole o URL do vídeo aqui...',
      'platforms.title': 'Plataformas Suportadas',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
