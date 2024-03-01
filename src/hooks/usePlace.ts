import { Place } from "@/interfaces/Entities/Place";
import { placesState } from "@/store/places"
import { useRecoilValue, useSetRecoilState } from "recoil";

export const usePlace = () => {
  const places = useRecoilValue<Place[]>(placesState);
  const setPlaces = useSetRecoilState<Place[]>(placesState);

  return {
    places,
    setPlaces
  }
}