import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
    competitions: any
}

interface CompetitionItem {
   code: string;
   emblem: string;
   id: number;
   name: string;
   type: string;
}

const Competitions: FC<IProps> = ({ competitions }) => {

   const navigate = useNavigate()

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {competitions.competitions.map((item: CompetitionItem) => (
            <div
               key={item.id}
               className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center justify-center p-4"
               onClick={() => navigate('/matches', {state: {competitionId: item.id}})}
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
   );
};

export default Competitions;
