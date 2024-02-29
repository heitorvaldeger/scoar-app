import { modalProtocolListState } from "@/store/modals";
import { useRecoilState } from "recoil";

export const useModalProtocolList = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalProtocolListState);

  return {
    isOpen,
    handleOpenModal: () => setIsOpen(true),
    handleCloseModal: () => setIsOpen(false)
  }
}