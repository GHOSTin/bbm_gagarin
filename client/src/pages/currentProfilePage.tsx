import React from 'react';
import { useAtom } from 'jotai';
import { currentUser } from '@/atoms.ts';
import 'dayjs/locale/ru';
import Profile from '@/components/profiles/profile.tsx';

interface ProfilePageProps {}

const CurrentProfilePage: React.FC<ProfilePageProps> = () => {
  const [profileUser, setProfileUser] = useAtom(currentUser);

  return (
    <>
      <Profile user={profileUser} setUser={setProfileUser} editable={true}/>
    </>
  )
}

export default CurrentProfilePage