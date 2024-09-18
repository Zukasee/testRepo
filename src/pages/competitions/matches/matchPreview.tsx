import dayjs from "dayjs";
import { FC } from "react";

interface IProps {
    match: any
}

const MatchPreview:FC<IProps> = ({ match }) => {
   return (
      <div
         key={match.id}
         className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-between"
      >
         <div className="flex items-center justify-around mb-4">
            <div className="flex flex-col items-center w-36">
               <img
                  src={match.homeTeam.crest}
                  alt={match.homeTeam.name}
                  className="w-12 h-12 mb-2"
               />
               <p className="text-sm font-medium">{match.homeTeam.shortName}</p>
            </div>

            <p className="text-sm font-bold text-gray-500">vs</p>

            <div className="flex flex-col items-center w-36">
               <img
                  src={match.awayTeam.crest}
                  alt={match.awayTeam.name}
                  className="w-12 h-12 mb-2"
               />
               <p className="text-sm font-medium">{match.awayTeam.shortName}</p>
            </div>
         </div>

         <p className="text-sm text-gray-700">
            {dayjs(match.utcDate).format('MMMM D, YYYY h:mm A')}
         </p>
      </div>
   );
};

export default MatchPreview;
