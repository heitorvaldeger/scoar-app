import { modalPlaceListState } from "@/store/modals";
import { useSetRecoilState } from "recoil";

export const useModalPlaceListActions = () => {
  const setIsOpen = useSetRecoilState(modalPlaceListState);

  return {
    handleOpenModal: () => setIsOpen(true),
    handleCloseModal: () => setIsOpen(false)
  }
}