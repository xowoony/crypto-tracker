import { atom } from "recoil";

export const isDarkAtom = atom({
  // key : "이름이고 유일해야함"
  // default : 기본적으로 둘 값
  key: "isDark",
  default: false,
});
