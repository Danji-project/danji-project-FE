import {Routes, Route} from 'react-router-dom';
import { Suspense } from 'react';
import AuthRoutes from './AuthRoutes';
import { LoginPage } from '../pages/loginPage/loginPage';
import MainPage from '../pages/mainPage/mainPage';


const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loding...</div>}>
        <Routes>
            <Route element={<AuthRoutes/>}>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/main' element={<MainPage/>}/>
            </Route>
        </Routes>
    </Suspense>
  );
}

export default AppRoutes;