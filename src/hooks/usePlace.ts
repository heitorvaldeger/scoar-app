import { Place } from "@/interfaces/Entities/Place";
import { placesState } from "@/store/places"
import { useRecoilValue } from "recoil";

export const usePlace = () => {
  const places = useRecoilValue<Place[]>(placesState);

  return {
    places
  }
}