import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useGetMatchesQuery } from './redux/matchesApi';
import './App.css';

// Тип для item
interface CompetitionItem {
  code: string;
  emblem: string;
  id: number;
  name: string;
  type: string;
}

interface TelegramWebApp {
  initDataUnsafe: {
    user?: {
      username: string;
      photo_url: string;
      level: string; // Добавим уровень пользователя
      progress: number; // Добавим прогресс
    };
    chat?: {
      photo_url: string;
    }
  };
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export default function App() {
  const { data: matches, isFetching: isMatchesFetching } = useGetMatchesQuery({});

  const tg = window.Telegram.WebApp;

  const paginationLabels = ['Главная', 'Турниры', 'Друзья'];

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className} flex items-center justify-center text-sm text-black">
                ${paginationLabels[index]}
              </span>`;
    },
  };

  return (
    <div className="h-screen">
      {isMatchesFetching ? (
        <div className="text-white text-center">Loading...</div>
      ) : (
        <Swiper
          slidesPerView={1}
          pagination={pagination}
          modules={[Pagination]}
          autoHeight={true}
          className="mySwiper w-full h-full"
        >
          <SwiperSlide className="flex flex-col items-center justify-center text-xl bg-slate-600 h-full p-4">
            <div className="flex flex-col items-center w-full h-full justify-between">
              <div className="flex items-center justify-start w-full mb-4">
                <img 
                  src={tg.initDataUnsafe?.chat?.photo_url} 
                  alt={tg.initDataUnsafe?.user?.username}
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4 text-white">
                  <h2 className="text-xl font-semibold">{tg.initDataUnsafe?.user?.photo_url}</h2>
                  <h2 className="text-xl font-semibold">{tg.initDataUnsafe?.chat?.photo_url}</h2>
                  <h2 className="text-xl font-semibold">{tg.initDataUnsafe?.user?.username}</h2>
                  <p className="text-yellow-400 text-lg">Lv. 1</p>
                </div>
              </div>
              <div className="w-full mb-4">
                <div className="relative w-full h-2 bg-gray-300 rounded">
                  <div 
                    className="absolute top-0 left-0 h-full bg-yellow-400 rounded"
                    style={{ width: `${tg.initDataUnsafe?.user?.progress || 0}%` }}
                  />
                </div>
              </div>
              <img src='fonts/coach3.png' alt='Тренер' className="w-max h-auto object-cover"/>
            </div>
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center text-xl bg-slate-600 h-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.competitions.map((item: CompetitionItem) => (
                <div
                  key={item.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center justify-center p-4"
                >
                  <img
                    src={item.emblem}
                    alt={item.code}
                    className="w-16 h-16 mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500">Code: {item.code}</p>
                </div>
              ))}
            </div>
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center text-xl bg-slate-600 h-full p-4">
            Друзья
          </SwiperSlide>
        </Swiper>
      )}
    </div>
  );
}
