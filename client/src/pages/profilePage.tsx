import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { UserEntityIdAtom } from '@/atoms.ts';
import 'dayjs/locale/ru';
import apiClient from '@/shared/axios.apiClient.ts';
import { useParams } from 'react-router-dom';
import { UserEntity } from '../shared/types';
import Profile from '@/components/profiles/profile.tsx';
import { ChecklistsList } from '@/components/checklists';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState<UserEntity>({} as UserEntity);

  const [entityId, setEntityId] = useAtom(UserEntityIdAtom)

  useEffect(() => {
    setEntityId(id!)
    return () => setEntityId(null)
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await apiClient.get(`/users/${entityId}`);
      return response.data
    }
    if(entityId) {
      fetchUserData().then((data)=>setProfileUser(data));
    }
  }, [entityId]);

  if (entityId !== id) return null

  return (
    <>
      <Profile user={profileUser} setUser={setProfileUser} editable={false}/>
      {profileUser.checkLists ? (<ChecklistsList checklists={profileUser?.checkLists} />) : null}
    </>
  )
}

export default ProfilePage