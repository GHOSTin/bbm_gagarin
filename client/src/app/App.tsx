import React, { useEffect } from 'react';
import { useSetAtom } from "jotai";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { isAuthenticatedState } from '../atoms.ts';
import LoginPage from '@/pages/LoginPage.tsx';
import ProfilePage from '@/pages/profilePage.tsx';
import { PublicRoute } from '@/components/routes/publicRoute.tsx';
import { NavSidebarLayout } from '@/app/layouts/navSidebarLayout.tsx';
import { PrivateRoute } from '@/components/routes/privateRoute.tsx';

const App: React.FC = () => {
  // const [isAuthenticated] = useState(false);
  const isAuthenticatedSet = useSetAtom(isAuthenticatedState);

  useEffect(() => {
    const initState = !!localStorage.getItem('accessToken');
    isAuthenticatedSet(initState);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<PublicRoute/>}>
            <Route path="/login" element={<LoginPage/>} />
          </Route>
          <Route element={<PrivateRoute/>}>
            <Route element={<NavSidebarLayout/>}>
              <Route index path="/" element={<></>}/>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<div>404... not found </div>} />
            </Route>
          </Route>
          {/* Дополнительные маршруты могут быть добавлены здесь */}
          <Route path="*" element={<div>404... not found </div>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;