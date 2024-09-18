import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
   return (
      <div className="flex justify-center items-center h-[100vh] bg-slate-800">
         <Box sx={{ display: 'flex' }}>
            <CircularProgress />
         </Box>
         <div className="text-white text-center ml-1">Загрузка...</div>
      </div>
   );
};

export default Loader;
