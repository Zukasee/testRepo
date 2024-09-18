import { useTelegram } from '../../shared/hooks/useTelegram';

const Main = () => {
   const { tg } = useTelegram();

   return (
      <div className="flex flex-col items-center w-full h-full justify-between">
         <div className="flex items-center justify-start w-full mb-4">
            <img
               src={tg.initDataUnsafe?.user?.photo_url || '/fonts/default.jpg'}
               alt={tg.initDataUnsafe?.user?.username || 'User'}
               className="w-16 h-16 rounded-full"
            />
            <div className="ml-4 text-white">
               <h2 className="text-xl font-semibold">
                  {tg.initDataUnsafe?.user?.username || 'Username'}
               </h2>
               <p className="text-yellow-400 text-lg">Lv. 1</p>
            </div>
         </div>
         <div className="w-full mb-4">
            <div className="relative w-full h-2 bg-gray-300 rounded">
               <div
                  className="absolute top-0 left-0 h-full bg-yellow-400 rounded"
                  style={{
                     width: `${66}%`,
                  }}
               />
            </div>
            <p className="text-white text-center mt-1">
               Прогресс до следующего уровня
            </p>
         </div>
         <img
            src="/fonts/coach3.png"
            alt="Тренер"
            className="w-max h-auto object-cover"
         />
      </div>
   );
};

export default Main;
