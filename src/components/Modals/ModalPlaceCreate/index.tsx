import { Dialog, DialogActions, DialogContent, Grid } from "@mui/material";
import { ButtonDefault } from '@/components/Buttons/ButtonDefault';
import { InputDefault } from '@/components/Inputs/InputDefault';
import { useModalPlaceCreate } from '@/components/Modals/ModalPlaceCreate/useModalPlaceCreate';

export const ModalPlaceCreate = () => {

  const {
    isOpen,
    handleCloseModal,
    handleCodeChange,
    handleNameChange,
    handleCreatePlace
  } = useModalPlaceCreate();

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} fullWidth>
      {/* <DialogTitle>{isEdit ? 'Editando' : 'Novo'} local</DialogTitle> */}
      <DialogContent>
        <div className='py-2'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputDefault
                label="ID"
                type="text"
                fullWidth={true}
                variant="standard"
                helperText='Ex.: C22, C23, C24'
                onChange={handleCodeChange}
              />
            </Grid>

            <Grid item xs={12}>
              <InputDefault
                label="Nome"
                type="text"
                fullWidth={true}
                variant="standard"
                helperText='Ex.: Lab de Eletrônica, Lab de Alimentos'
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
          onClick={handleCreatePlace}
        />
      </DialogActions>
    </Dialog>
  );
};