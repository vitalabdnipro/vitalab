import { atom, createStore } from "jotai";

const phoneAtom = atom({ phone: "", verified: false });
const orderAtom = atom(null);
const otpAtom = atom("");
const myStore = createStore();

export { phoneAtom, orderAtom, otpAtom, myStore };
