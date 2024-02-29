import { useState } from "react";
import { useModalProtocolList } from "../components/Modals/ModalProtocolList/useModalProtocolList";
import { useModalPlaceListActions } from "@/components/Modals/ModalPlaceList/useModalPlaceListActions";

export const useToolbarAdministration = () => {
  const title = 'Dispositivos';
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const {
    handleOpenModal: onOpenModalPlaceList
  } = useModalPlaceListActions();
  const {
    handleOpenModal: onOpenModalProtocolList
  } = useModalProtocolList();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const onOpenModalCreateDevice = () => {
    console.log('open modal create device');
  }

  return {
    anchorElNav,
    handleCloseNavMenu,
    handleOpenNavMenu,
    onOpenModalCreateDevice,
    onOpenModalProtocolList,
    onOpenModalPlaceList,
    title
  }
}