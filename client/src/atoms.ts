import { atom } from "jotai";

export const jwtState = atom<string|null>(
  localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null
);

export const isAuthenticatedState = atom<boolean>(false);

// export const refreshTokens = selector({
//   key: 'refreshTokens',
//   set: ({get, set}) => {
//
//   }
// })