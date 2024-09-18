import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Main from './main/main';
import Competitions from './competitions/competitions';
import { useGetCompetitionsQuery } from '../shared/api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function MainPage() {
   const { data: competitions, isFetching: isCompetitionsFetching } = useGetCompetitionsQuery({});

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
         {isCompetitionsFetching ? (
         <Box sx={{ display: 'flex' }}>
            <div className="text-white text-center">Loading...</div>
            <CircularProgress />
          </Box>
            
         ) : (
            <Swiper
               slidesPerView={1}
               pagination={pagination}
               modules={[Pagination]}
               autoHeight={true}
               className="mySwiper w-full h-full"
            >
               <SwiperSlide className="flex flex-col items-center justify-center text-x h-full p-4">
                  <Main />
               </SwiperSlide>

               <SwiperSlide className="flex items-center justify-center text-xl h-full p-4">
                  <Competitions competitions={competitions}/>
               </SwiperSlide>

               <SwiperSlide className="flex items-center justify-center text-xl h-full p-4">
                  Друзья
               </SwiperSlide>
            </Swiper>
         )}
      </div>
   );
}