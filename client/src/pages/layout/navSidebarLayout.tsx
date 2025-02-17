import React from 'react';
// import {
//   AiOutlineFolderOpen,
//   AiOutlineHome,
//   AiOutlineSetting,
//   AiOutlineUserSwitch,
// } from 'react-icons/ai';
// import { RiTodoLine } from 'react-icons/ri';
import { NavbarSimple } from '@/components/Navbar/Navbar.tsx';
//
// type ListItem = {
//   text?: string
//   icon: React.ElementType
// }
//
// const listItems: ListItem[] = [
//   {
//     text: 'Home',
//     icon: AiOutlineHome,
//   },
//   {
//     text: 'Settings',
//     icon: AiOutlineSetting,
//   },
//   {
//     text: 'Users',
//     icon: AiOutlineUserSwitch,
//   },
//   {
//     text: 'Tasks',
//     icon: RiTodoLine,
//   },
//   {
//     text: 'Folder',
//     icon: AiOutlineFolderOpen,
//   },
// ]

export const NavSidebar: React.FC<React.PropsWithChildren> = ({children}) => {
  // const { open, setOpen } = useDisclosure()
  return (
    <>
      <NavbarSimple/>
      {children}
    </>
  )
}