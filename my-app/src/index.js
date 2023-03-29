import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import login from './login';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { I18nextProvider } from "react-i18next";
import i18next from 'i18next';

import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";

const availableLanguages = ["es", "en"]
const preferredLanguage = navigator.language.toLowerCase().substring(0,2)
const defaultAlternativeLanguage = "es"

console.log("IDIOMA")
console.log(preferredLanguage)
console.log("IDIOMA")

i18next.init({
  interpolation: {escapeValue: false},
  lng: (availableLanguages.includes(preferredLanguage) ? preferredLanguage : defaultAlternativeLanguage),
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider
      i18n={i18next}
    >
      <ThemeContextProvider
        children={<App />}
      />
    </I18nextProvider>
    {/* <Login /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
