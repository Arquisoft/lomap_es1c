import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './login';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { I18nextProvider } from "react-i18next";
import i18next from 'i18next';

import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";
import axios from 'axios';

const availableLanguages = ["es", "en"]
const preferredLanguage = navigator.language.toLowerCase().substring(0,2)
const defaultAlternativeLanguage = "es"

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

function MyComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie, setCookie] = useState(false);

  function logOut() {
    setIsLoggedIn(false);
  }
  function logIn() {
    axios.get('http://localhost:8080/login')
    .then(response => {
      setIsLoggedIn(true);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <>
    {
      isLoggedIn ? (
        <I18nextProvider i18n={i18next}>
          <ThemeContextProvider children={<App logOutFunction={logOut}/>} />
        </I18nextProvider>
      ) : (
        <Login
          logInFunction = {logIn}
        />
      )
    }
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyComponent />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
