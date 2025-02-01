import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import { TaskList } from './components/TaskList';
import { FiltersContextProvider } from './context/FilterContext';
import Dashboard from './pages/Dashboard';
import Guard from './utils/Guard';
import NotFound from '@/NotFound';

export default function DashboardRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Guard />}>
          <Route element={<Dashboard />}>
            <Route
              index
              element={
                <FiltersContextProvider>
                  <TaskList />
                </FiltersContextProvider>
              }
            />
          </Route>
          <Route path='*' element={<NotFound />} />
          {/* <Route path='profile' element={<Profile />} /> */}
        </Route>
      </Routes>
      <div className='absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]'></div>
    </>
  );
}
