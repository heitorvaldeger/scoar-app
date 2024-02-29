import { Box, Card, Container, Typography } from "@mui/material";
import logo from '@/assets/images/ifrn-logo.png';
import { InputDefault } from "@/components/Inputs/InputDefault";
import { useLogin } from "@/hooks/useLogin";
import { ButtonDefault } from "@/components/Buttons/ButtonDefault";
import { LoadingProgress } from "@/components/Loading/LoadingDefault";

export const Login = () => {
  const {
    loading,
    handleLogin,
    handleEmailChange,
    handlePasswordChange
  } = useLogin();

  return (
    <Container fixed maxWidth='sm'>
      <Box sx={{ height: '100vh' }} className='flex'>
        <Card className="py-2 w-4/5 m-auto">
          <div className="flex justify-center">
            <img src={logo} alt="ifrn logo" width={200}/>
          </div>

          <hr className="my-3 mx-3"/>

          <div className="text-center">
            <Typography variant="h5">Login</Typography>
          </div>

          <div className="text-center px-3">
            <InputDefault
              autoFocus
              label="E-mail"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleEmailChange(e.target.value)}
            />

            <div className="my-10"></div>

            <InputDefault
              label="Senha"
              type="password"
              fullWidth
              variant="standard"
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
          </div>

          <div className="py-2 text-center">
            {
              loading ? (
                <LoadingProgress />
              ) : (
                <ButtonDefault
                  text='Entrar'
                  variant='contained'
                  sx={{
                    fontWeight: 500,
                  }}
                  className={'normal-case bg-zinc-600'}
                  onClick={handleLogin}
                />
              )
            }
          </div>
        </Card>
      </Box>
    </Container>
  )
}
