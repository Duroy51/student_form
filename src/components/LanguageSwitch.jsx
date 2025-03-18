import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">{language.toUpperCase()}</span>
    </button>
  );
}