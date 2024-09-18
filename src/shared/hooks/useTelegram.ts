interface TelegramWebApp {
    initDataUnsafe: {
       user?: {
          username: string;
          photo_url: string;
       };
       chat?: {
          photo_url: string;
       };
    };
}
 
declare global {
    interface Window {
       Telegram: {
          WebApp: TelegramWebApp;
       };
    }
}

const tg = window.Telegram.WebApp;

export function useTelegram() {

    return {
        tg,
        user: tg.initDataUnsafe?.user
    }
}