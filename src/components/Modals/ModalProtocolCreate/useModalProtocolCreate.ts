import { Protocol } from "@/interfaces/Protocol";
import { modalProtocolCreateState } from "@/store/modals";
import { useState } from "react";
import { useRecoilState } from "recoil";

export const useModalProtocolCreate = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalProtocolCreateState);
  const [protocol, setProtocol] = useState<Protocol>({
    code: 0,
    name: '',
  })
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setProtocol({
    ...protocol,
    code: Number(e.target.value)
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setProtocol({
    ...protocol,
    name: e.target.value
  });

  return {
    isOpen,
    protocol,
    handleOpenModal: () => setIsOpen(true),
    handleCloseModal: () => setIsOpen(false),
    handleCodeChange,
    handleNameChange,
  }
}