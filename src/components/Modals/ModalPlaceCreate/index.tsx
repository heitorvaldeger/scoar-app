import { Dialog, DialogActions, DialogContent, Grid } from "@mui/material";
import { ButtonDefault } from '@/components/Buttons/ButtonDefault';
import { InputDefault } from '@/components/Inputs/InputDefault';
import { useModalPlaceCreate } from '@/components/Modals/ModalPlaceCreate/useModalPlaceCreate';
import { LoadingProgress } from "@/components/Loading/LoadingDefault";

export const ModalPlaceCreate = () => {

  const {
    loading,
    isOpen,
    errors,
    handleCloseModal,
    handleCodeChange,
    handleNameChange,
    handleCreatePlace
  } = useModalPlaceCreate();

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} fullWidth>
      <DialogContent>
        <div className='py-2'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputDefault
                label="ID"
                type="text"
                fullWidth={true}
                variant="standard"
                onChange={handleCodeChange}
                error={!errors.code.isValid}
                helperText={errors.code.messages.length > 0 ? errors.code.messages[0] : 'Ex.: C22, C23, C24'}
              />
            </Grid>

            <Grid item xs={12}>
              <InputDefault
                label="Nome"
                type="text"
                fullWidth={true}
                variant="standard"
                onChange={handleNameChange}
                error={!errors.name.isValid}
                helperText={errors.name.messages.length > 0 ? errors.name.messages[0] : 'Ex.: Lab de Eletrônica, Lab de Alimentos'}
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

        {
          loading
            ? <LoadingProgress />
            : <ButtonDefault
              text='Confirmar'
              variant='contained'
              className='bg-green-600'
              style={{
                fontWeight: 500
              }}
              onClick={handleCreatePlace}
            />
        }
      </DialogActions>
    </Dialog>
  );
};