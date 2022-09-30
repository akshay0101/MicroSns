import { atom, RecoilRoot } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: "ok",
});
