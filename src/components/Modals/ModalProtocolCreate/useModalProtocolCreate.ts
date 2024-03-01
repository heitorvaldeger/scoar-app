import { useLoading } from "@/hooks/useLoading";
import { useProtocol } from "@/hooks/useProtocol";
import { Protocol } from "@/interfaces/Entities/Protocol";
import { modalProtocolCreateState } from "@/store/modals";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

const protocolInitialState: Protocol = {
  code: 0,
  name: '',
};

export const useModalProtocolCreate = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalProtocolCreateState);
  const { loading, setLoading } = useLoading();
  const [protocol, setProtocol] = useState<Protocol>(protocolInitialState);
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
        reject({
          message: 'Preencha todos os campos!'
        });
      }
      
      setLoading(true);
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
          setLoading(false);
          setProtocol(protocolInitialState);
          return 'Protocolo criado com sucesso!';
        }
      },
      error: {
        render: ({ data }: any) => {
          setLoading(false);
          return data.message;
        }
      }
    });
  }

  return {
    loading,
    isOpen,
    protocol,
    handleOpenModal: () => setIsOpen(true),
    handleCloseModal: () => setIsOpen(false),
    handleCodeChange,
    handleNameChange,
    handleCreateProtocol
  }
}