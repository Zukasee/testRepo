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
    <div className="h-full">
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
          <SwiperSlide className="flex items-center justify-center text-xl bg-slate-600 h-full p-4">
            Главная
            {tg.initDataUnsafe?.user?.username}
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
