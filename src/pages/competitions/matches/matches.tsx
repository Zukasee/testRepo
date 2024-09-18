import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetMatchesQuery } from '../../../shared/api';
import dayjs from 'dayjs';
import { useSwipeable } from 'react-swipeable';
import Loader from '../../../shared/helpers/Loader';

const Matches: FC = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const { competitionId } = location.state;
   const { data: matches, isFetching } = useGetMatchesQuery(competitionId);

   const handleSwipe = useSwipeable({
      onSwipedRight: () => navigate(-1),
      preventScrollOnSwipe: true,
      trackMouse: true,
   });

   return (
      <div {...handleSwipe} className="container mx-auto">
         {isFetching ? (
            <Loader />
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
               <h1 className="text-2xl font-bold text-center text-white">
                  Матчи
               </h1>
               {matches.matches.map((match: any) => (
                  <div
                     key={match.id}
                     className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-between"
                  >
                     <div className="flex items-center justify-around w-full mb-4">
                        <div className="flex flex-col items-center">
                           <img
                              src={match.homeTeam.crest}
                              alt={match.homeTeam.name}
                              className="w-12 h-12 mb-2"
                           />
                           <p className="text-sm font-medium">
                              {match.homeTeam.shortName}
                           </p>
                        </div>

                        <p className="text-sm font-bold text-gray-500">vs</p>

                        <div className="flex flex-col items-center">
                           <img
                              src={match.awayTeam.crest}
                              alt={match.awayTeam.name}
                              className="w-12 h-12 mb-2"
                           />
                           <p className="text-sm font-medium">
                              {match.awayTeam.shortName}
                           </p>
                        </div>
                     </div>

                     <p className="text-sm text-gray-700">
                        {dayjs(match.utcDate).format('MMMM D, YYYY h:mm A')}
                     </p>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Matches;
