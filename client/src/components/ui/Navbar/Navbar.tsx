import { useState } from 'react';
import {
  IconAlbum,
  IconUsers,
} from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import { UserButton } from '@/components/ui/UserButton/UserButton.tsx';
import { LogoutButton } from '@/components/ui/Navbar/logoutButton.tsx';
import { useAtomValue } from 'jotai';
import { userRoleState } from '@/atoms.ts';
import { NavLink } from 'react-router-dom';

const data = [
  { link: '/profiles', label: 'Профили пользователей', key: 'profile', icon: IconUsers, allowedRoles: ['ADMIN', 'MODERATOR'] },
  { link: '/groups', label: 'Список отрядов', key: 'groups', icon: IconAlbum, allowedRoles: ['ADMIN'] },
];

export function NavbarSimple() {
  const [active, setActive] = useState('Billing');
  const userRole = useAtomValue(userRoleState);
  const links = data.filter((elem) => !elem.allowedRoles || elem.allowedRoles?.includes(userRole!)).map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.key === active || undefined}
      to={item.link}
      key={item.key}
      onClick={() => {
        setActive(item.key!);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <div className={classes.section}>
          <UserButton />
        </div>
        {links}
      </div>

      <div className={classes.footer}>
        <LogoutButton/>
      </div>
    </nav>
  );
}