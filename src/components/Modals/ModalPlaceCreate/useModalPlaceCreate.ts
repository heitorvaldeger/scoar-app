import { useLoading } from "@/hooks/useLoading";
import { usePlace } from "@/hooks/usePlace";
import { Place } from "@/interfaces/Entities/Place";
import { modalPlaceCreateState } from "@/store/modals";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { useValidatePlaceCreate } from "./useValidatePlaceCreate";

export const useModalPlaceCreate = () => {
  const { loading, setLoading } = useLoading();
  const { validateForm, resetFormValidation, errors } = useValidatePlaceCreate();
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
      const placeIsValid = validateForm(place);
      if (placeIsValid) {
        setLoading(true);

        setTimeout(() => {
          resolve(place);
        }, 2000);

        return;
      }

      reject('Existem campos inválidos!');
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
          resetFormValidation();
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
    errors,
    handleOpenModal: () => setIsOpen(true),
    handleCloseModal: () => {
      setIsOpen(false);
      resetFormValidation();
    },
    handleCodeChange,
    handleNameChange,
    handleCreatePlace
  }
}