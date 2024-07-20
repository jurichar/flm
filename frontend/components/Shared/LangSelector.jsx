import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex flex-col">
      <button onClick={() => changeLanguage('en')} type="button">
        English
      </button>
      <button onClick={() => changeLanguage('fr')} type="button">
        Français
      </button>
    </div>
  );
};

export default LanguageSelector;
