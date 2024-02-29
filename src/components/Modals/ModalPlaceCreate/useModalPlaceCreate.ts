import { Place } from "@/interfaces/Entities/Place";
import { modalPlaceCreateState } from "@/store/modals";
import { useState } from "react";
import { useRecoilState } from "recoil";

export const useModalPlaceCreate = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalPlaceCreateState);
  const [place, setPlace] = useState<Place>({
    code: '',
    name: '',
  })
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setPlace({
    ...place,
    code: e.target.value
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setPlace({
    ...place,
    name: e.target.value
  });

  return {
    isOpen,
    place,
    handleOpenModal: () => setIsOpen(true),
    handleCloseModal: () => setIsOpen(false),
    handleCodeChange,
    handleNameChange,
  }
}