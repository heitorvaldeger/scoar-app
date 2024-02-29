import { Place } from "@/interfaces/Place";
import { atom } from "recoil";

export const placesState = atom<Place[]>({
  key: 'places-list',
  default: [
    {
      code: 'place-1',
      name: 'Sala',
    },
    {
      code: 'place-2',
      name: 'Quarto',
    }
  ]
})