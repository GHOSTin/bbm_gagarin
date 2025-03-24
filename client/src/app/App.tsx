import React, { Suspense, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { isAuthenticatedState } from '../atoms.ts';
import LoginPage from '@/pages/LoginPage.tsx';
import ProfilePage from '@/pages/profilePage.tsx';
import { NavSidebarLayout } from '@/app/layouts/navSidebarLayout.tsx';
import { NotFound } from '@/components/ui/NotFound';
import { PrivateRoute, PublicRoute } from '@/components/routes';
import { TestEPI } from '@/components/ui/testEPI';
import { TestHolland } from '@/components/ui/testHolland/testHolland.tsx';
import { useAtomsDevtools } from 'jotai-devtools/utils';
import globalRouter from '@/shared/globalRouter.ts';
import { ProfilesPage } from '@/pages/profilesPage.tsx';
import CurrentProfilePage from '@/pages/currentProfilePage.tsx';
import HomePage from '@/pages/homePage.tsx';
import { TestMotivation } from '@/components/ui/testMotivation';
import { TestProfession } from '@/components/ui/testProfession/testProfession.tsx';
import { Loader } from '@mantine/core';
import { ChecklistsPage } from '@/pages/checklistsPage.tsx';
import { ChecklistNewPage } from '@/pages/checklistNewPage.tsx';

const AtomsDevtools: React.FC<React.PropsWithChildren> = ({ children }) => {
  useAtomsDevtools('bbm')
  return children
}

const App: React.FC = () => {
  const isAuthenticatedSet = useSetAtom(isAuthenticatedState);

  globalRouter.navigate = useNavigate();

  useEffect(() => {
    const initState = !!localStorage.getItem('accessToken');
    isAuthenticatedSet(initState);
  }, []);

  return (
    <AtomsDevtools>
      <div className="App">
        <Suspense fallback={<Loader color="blue" type="bars" size={50} />}>
        <Routes>
          <Route element={<PublicRoute/>}>
            <Route index path="/login" element={<LoginPage/>} />
          </Route>
          <Route element={<PrivateRoute/>}>
            <Route element={<NavSidebarLayout/>}>
              <Route index path="/" element={<HomePage/>}/>
              <Route path="/profile" element={<CurrentProfilePage/>} />
              <Route path="*" element={<NotFound/>} />
            </Route>
          </Route>
          <Route element={<PrivateRoute accessRoles={['USER']}/>}>
            <Route element={<NavSidebarLayout/>}>
              <Route path="/test-epi" element={<TestEPI/>} />
              <Route path="/test-holland" element={<TestHolland/>} />
              <Route path="/test-motivation" element={<TestMotivation/>} />
              <Route path="/test-profession" element={<TestProfession/>} />
              <Route path="/checklists" element={<ChecklistsPage/>} />
              <Route path="/checklists/new" element={<ChecklistNewPage/>} />
            </Route>
          </Route>
          <Route element={<PrivateRoute accessRoles={['ADMIN', 'MODERATOR']}/>}>
            <Route element={<NavSidebarLayout/>}>
              <Route path="/profiles" element={<ProfilesPage />} />
              <Route path="/profiles/:id" element={<ProfilePage/>} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound/>} />
      </Routes>
      </Suspense>
      </div>
    </AtomsDevtools>
  );
};

export default App;