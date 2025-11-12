import { useLanguage } from './contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="btn-language"
      title={language === 'portuguese' ? 'Switch to English' : 'Mudar para Português'}
    >
      {language === 'portuguese' ? '🇵🇹 PT' : '🇬🇧 EN'}
    </button>
  )
}