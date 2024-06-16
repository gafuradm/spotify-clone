# Проект Spotify Clone

Этот проект является клоном популярного музыкального сервиса Spotify. Он разработан с использованием Next.js, Firebase и других технологий.

## Установка

Для установки проекта выполните следующие шаги:

1. **Клонирование репозитория:**

   ```bash
   git clone git@github.com:gafuradm/spotify-clone.git
   cd spotify-clone
   npm install
   // файл firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
npm run dev
