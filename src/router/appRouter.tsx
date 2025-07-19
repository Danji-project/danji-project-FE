import {Routes, Route} from 'react-router-dom';
import { Suspense } from 'react';
import AuthRoutes from './AuthRoutes';
import { LoginPage } from '../pages/loginPage/loginPage';
import { FindInfoPage } from '../pages/findInfoPage/findInfoPage';
import { FindResultPage } from '../pages/findInfoPage/findResultPage';
import MainPage from '../pages/mainPage/mainPage';


const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loding...</div>}>
        <Routes>
            <Route element={<AuthRoutes/>}>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/main' element={<MainPage/>}/>
                <Route path='/find' element={<FindInfoPage/>}/>
                <Route path='/findresult' element={<FindResultPage/>}/>
            </Route>
        </Routes>
    </Suspense>
  );
}

export default AppRoutes;