import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetMatchesQuery } from '../../../shared/api';
import dayjs from 'dayjs';
import { useSwipeable } from 'react-swipeable';
import Loader from '../../../shared/helpers/Loader';
import MatchPreview from './matchPreview';

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
                  <MatchPreview match={match}/>
               ))}
            </div>
         )}
      </div>
   );
};

export default Matches;
