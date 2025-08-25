interface TelegramWebApp {
  initData?: string;
  // Добавьте другие свойства по необходимости
}

interface Window {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
}