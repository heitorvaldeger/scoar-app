import { modalPlaceListState } from "@/store/modals";
import { useRecoilValue } from "recoil";

export const useModalPlaceList = () => {
  const isOpen = useRecoilValue(modalPlaceListState);

  return {
    isOpen
  }
}