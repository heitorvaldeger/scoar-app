import { Dialog, DialogContent, DialogTitle, Divider, Paper, Toolbar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ButtonDefault } from "@/components/Buttons/ButtonDefault";
import { useModalPlaceList } from "@/components/Modals/ModalPlaceList/useModalPlaceList";
import { usePlace } from "@/hooks/usePlace";
import { ModalPlaceCreate } from "../ModalPlaceCreate";
import { useModalPlaceCreate } from "@/components/Modals/ModalPlaceCreate/useModalPlaceCreate";
import { useModalPlaceListActions } from "./useModalPlaceListActions";

export const ModalPlaceList = () => {
  const {
    isOpen
  } = useModalPlaceList();

  const {
    handleCloseModal
  } = useModalPlaceListActions();

  const {
    handleOpenModal: onOpenModalPlaceCreate
  } = useModalPlaceCreate();

  const {
    places
  } = usePlace();

  return (
    <>
      <Dialog open={isOpen} onClose={handleCloseModal} fullWidth>
        <DialogTitle>
          <Toolbar style={{
            padding: 0
          }}>
            <Typography fontSize={18} fontWeight={400}>Locais</Typography>
            <Divider orientation='vertical' flexItem sx={{
              my: 1,
              mx: 1
            }}
            />
            <ButtonDefault
              text='Novo local'
              variant='outlined'
              color="default"
              style={{
                fontWeight: 500
              }}
              onClick={onOpenModalPlaceCreate}
            />
          </Toolbar>
        </DialogTitle>
        <DialogContent>
          <Paper>
            <DataGrid
              rows={places}
              columns={[
                { field: 'code', headerName: 'Código', width: 450 },
                { field: 'name', headerName: 'Nome', width: 450 }
              ]}
              getRowId={(row) => row.code}
            />
          </Paper>
        </DialogContent>
      </Dialog>

      <ModalPlaceCreate />
    </>
  )
};
