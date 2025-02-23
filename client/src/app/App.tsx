import React, { useEffect } from 'react';
import { useSetAtom } from "jotai";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { isAuthenticatedState } from '../atoms.ts';
import LoginPage from '@/pages/LoginPage.tsx';
import ProfilePage from '@/pages/profilePage.tsx';
import { NavSidebarLayout } from '@/app/layouts/navSidebarLayout.tsx';
import { NotFound } from '@/components/ui/NotFound';
import { PrivateRoute, PublicRoute } from '@/components/routes';
import { TestEPI } from '@/components/ui/testEPI';
import { TestHolland } from '@/components/ui/testHolland/testHolland.tsx';

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
              <Route path="/test-epi" element={<TestEPI/>} />
              <Route path="/test-holland" element={<TestHolland/>} />
              <Route path="*" element={<NotFound/>} />
            </Route>
          </Route>
          {/* Дополнительные маршруты могут быть добавлены здесь */}
          <Route path="*" element={<NotFound/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;