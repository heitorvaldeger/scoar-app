import { useProtocol } from "@/hooks/useProtocol";
import { Protocol } from "@/interfaces/Entities/Protocol";
import { modalProtocolCreateState } from "@/store/modals";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

export const useModalProtocolCreate = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalProtocolCreateState);
  const [protocol, setProtocol] = useState<Protocol>({
    code: 0,
    name: '',
  });
  const { setProtocols } = useProtocol();
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setProtocol({
    ...protocol,
    code: Number(e.target.value)
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setProtocol({
    ...protocol,
    name: e.target.value
  });

  const handleCreateProtocol = () => {
    toast.promise(new Promise<Protocol>((resolve, reject) => {
      if (!protocol.name || !protocol.code) {
        toast.error('Existem dados inválidos!');
        reject();
      }
      
      setTimeout(() => {
        resolve(protocol);
      }, 2000);
    }), {
      pending: 'Criando protocolo...',
      success: {
        render: ({ data: protocol }) => {
          setProtocols((prevState) => {
            return [
              ...prevState,
              protocol
            ]
          })
          setIsOpen(false);
          return 'Protocolo criado com sucesso!';
        }
      },
      error: {
        render: (e: any) => e.message
      }
    });
  }

  return {
    isOpen,
    protocol,
    handleOpenModal: () => setIsOpen(true),
    handleCloseModal: () => setIsOpen(false),
    handleCodeChange,
    handleNameChange,
    handleCreateProtocol
  }
}