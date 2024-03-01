import { Dialog, DialogActions, DialogContent, Grid } from "@mui/material";
import { ButtonDefault } from '@/components/Buttons/ButtonDefault';
import { InputDefault } from '@/components/Inputs/InputDefault';
import { useModalProtocolCreate } from "@/components/Modals/ModalProtocolCreate/useModalProtocolCreate";

export const ModalProtocolCreate = () => {
  const {
    isOpen,
    handleCloseModal,
    handleCodeChange,
    handleNameChange,
    handleCreateProtocol
  } = useModalProtocolCreate();

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} fullWidth>
      <DialogContent>
        <div className='py-2'>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <InputDefault
                label="Código do Protocolo"
                type="text"
                fullWidth={true}
                variant="standard"
                onChange={handleCodeChange}
              />
            </Grid>

            <Grid item xs={12}>
              <InputDefault
                label="Nome"
                type="text"
                fullWidth={true}
                variant="standard"
                helperText='Ex.: GREE, LG, SAMSUNG'
                onChange={handleNameChange}
              />
            </Grid>
          </Grid>
        </div>
      </DialogContent>

      <DialogActions>
        <ButtonDefault
          text='Cancelar'
          variant='outlined'
          style={{
            fontWeight: 500
          }}
          onClick={handleCloseModal}
        />

        <ButtonDefault
          text='Confirmar'
          variant='contained'
          className='bg-green-600'
          style={{
            fontWeight: 500
          }}
          onClick={handleCreateProtocol}
        />
      </DialogActions>
    </Dialog>
  );
};