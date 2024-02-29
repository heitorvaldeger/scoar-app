import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper } from "@mui/material";
import { useDevice } from "@/hooks/useDevice";
import { ToolbarAdministration } from '@/components/Toolbar/ToolbarAdministration';
import { ModalPlaceList } from '@/components/Modals/ModalPlaceList';
import { ModalProtocolList } from '@/components/Modals/ModalProtocolList';
import { useModalPlaceList } from '@/components/Modals/ModalPlaceList/useModalPlaceList';
import { useModalProtocolList } from '@/components/Modals/ModalProtocolList/useModalProtocolList';

const columns: GridColDef[] = [
  { field: 'code', headerName: 'Código', width: 450 },
  { field: 'protocol', headerName: 'Protocolo', width: 450 },
  { field: 'place', headerName: 'Local', width: 450 },
];

export const Administration = () => {
  const { devices } = useDevice();
  const { isOpen: isOpenPlaceList } = useModalPlaceList();
  const { isOpen: isOpenProtocolList } = useModalProtocolList();

  // const handleDeleteDevice = async (deviceId: string) => {
  //   const confirmed = await confirm('Deseja realmente excluir este dispositivo?', 'Excluir dispositivo');

  //   // if (confirmed) {
  //   //   toast.promise(new Promise((resolve, reject) => {
  //   //     setTimeout(() => {
  //   //       deleteDevice(deviceId).then((data) => {
  //   //         resolve(data);
  //   //       }).catch((e) => {
  //   //         reject(e);
  //   //       })
  //   //     }, 2000)
  //   //   }), {
  //   //     pending: FirebaseMessages.OPERATION_LOADING,
  //   //     success: {
  //   //       render: ({ data }) => {
  //   //         setDevices(devices.filter(device => device.code !== deviceId));
  //   //         return FirebaseMessages.OPERATION_SUCCESS;
  //   //       }
  //   //     },
  //   //     error: {
  //   //       render: (e: any) => e.message
  //   //     }
  //   //   });
  //   // }
  // }

  return (
    <div className="container mx-auto px-4">
      <Paper elevation={1}>
        <ToolbarAdministration />
        <DataGrid
          columns={columns}
          rows={devices}
          getRowId={(row) => row.code}
        />
      </Paper>

      {isOpenPlaceList && <ModalPlaceList />}
      {isOpenProtocolList && <ModalProtocolList />}
    </div>
  )
}