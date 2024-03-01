import { useLoading } from "@/hooks/useLoading";
import { usePlace } from "@/hooks/usePlace";
import { Place } from "@/interfaces/Entities/Place";
import { modalPlaceCreateState } from "@/store/modals";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

export const useModalPlaceCreate = () => {
  const { loading, setLoading } = useLoading();
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
        reject({
          message: 'Preencha todos os campos!'
        });
      }

      setLoading(true);
  
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
          setLoading(false);
          return 'Local criado com sucesso!';
        }
      },
      error: {
        render: ({ data: message }: any) => {
          setLoading(false);
          return message;
        }
      }
    })
  }

  return {
    loading,
    isOpen,
    place,
    handleOpenModal: () => setIsOpen(true),
    handleCloseModal: () => setIsOpen(false),
    handleCodeChange,
    handleNameChange,
    handleCreatePlace
  }
}