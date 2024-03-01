import { usePlace } from "@/hooks/usePlace";
import { Place } from "@/interfaces/Entities/Place";
import { modalPlaceCreateState } from "@/store/modals";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

export const useModalPlaceCreate = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalPlaceCreateState);
  const [place, setPlace] = useState<Place>({
    code: '',
    name: '',
  });
  const { setPlaces } = usePlace();
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setPlace({
    ...place,
    code: e.target.value
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setPlace({
    ...place,
    name: e.target.value
  });

  const handleCreatePlace = async () => {
    const createPlacePromise = new Promise<Place>((resolve, reject) => {
      if (!place.name || !place.code) {
        toast.error('Existem dados inválidos!');
        reject();
      }
  
      setTimeout(() => {
        resolve(place);
      }, 2000);
    });

    toast.promise(createPlacePromise, {
      pending: 'Criando local...',
      success: {
        render: ({ data: place }) => {
          setPlaces((prevState) => {
            return [
              ...prevState,
              place
            ]
          });
          setIsOpen(false);
          return 'Local criado com sucesso!';
        }
      },
      error: {
        render: () => 'Erro ao criar local'
      }
    })
  }

  return {
    isOpen,
    place,
    handleOpenModal: () => setIsOpen(true),
    handleCloseModal: () => setIsOpen(false),
    handleCodeChange,
    handleNameChange,
    handleCreatePlace
  }
}