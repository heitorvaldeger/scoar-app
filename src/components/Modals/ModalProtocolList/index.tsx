import { Dialog, DialogContent, DialogTitle, Divider, Paper, Toolbar, Typography } from "@mui/material";
import { ButtonDefault } from "@/components/Buttons/ButtonDefault";
import { DataGrid } from "@mui/x-data-grid";
import { useProtocol } from "@/hooks/useProtocol";
import { useModalProtocolList } from "@/components/Modals/ModalProtocolList/useModalProtocolList";
import { ModalProtocolCreate } from "../ModalProtocolCreate";
import { useModalProtocolCreate } from "@/components/Modals/ModalProtocolCreate/useModalProtocolCreate";

export const ModalProtocolList = () => {
  const {
    protocols
  } = useProtocol();

  const {
    isOpen,
    handleCloseModal
  } = useModalProtocolList();

  const {
    handleOpenModal: onOpenModalProtocolCreate
  } = useModalProtocolCreate();

  return (
    <>
      <Dialog open={isOpen} onClose={handleCloseModal} fullWidth>
        <DialogTitle>
          <Toolbar style={{
            padding: 0
          }}>
            <Typography fontSize={18} fontWeight={400}>Protocolos</Typography>
            <Divider orientation='vertical' flexItem sx={{
              my: 1,
              mx: 1
            }}
            />
            <ButtonDefault
              text='Novo protocolo'
              variant='outlined'
              style={{
                fontWeight: 500
              }}
              onClick={onOpenModalProtocolCreate}
            />
          </Toolbar>
        </DialogTitle>
        <DialogContent>
          <Paper>
            <DataGrid
              rows={protocols}
              columns={[
                { field: 'code', headerName: 'Código', width: 450 },
                { field: 'name', headerName: 'Nome', width: 450 }
              ]}
              getRowId={(row) => row.code}
            />
          </Paper>
        </DialogContent>
      </Dialog>
      <ModalProtocolCreate />
    </>
  )
};
