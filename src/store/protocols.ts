import { Protocol } from "@/interfaces/Entities/Protocol";
import { atom } from "recoil";

export const protocolsState = atom<Protocol[]>({
  key: 'protocols-list',
  default: [
    {
      code: 24,
      name: 'LG',
    },
    {
      code: 30,
      name: 'GREE',
    }
  ]
})