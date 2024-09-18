import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';
import MainPage from './pages/mainPage';
import { Route, Routes } from 'react-router-dom';
import Matches from './pages/competitions/matches/matches';

export default function App() {
   return (
      <>
         <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/matches'} element={<Matches />} />
         </Routes>
      </>
   );
}
