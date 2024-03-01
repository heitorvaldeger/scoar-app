import { CircularProgress } from "@mui/material";
import { LoadingDefaultProps } from "./type";

export const LoadingProgress = (props: LoadingDefaultProps) => {

  const {
    size: size = 24,
    label: label = 'Carregando...'
  } = props;

  return (
    <div className="flex items-center justify-center">
      <CircularProgress size={size} sx={{
        color: '#000'
      }} className="mx-2" />
      <span>{label}</span>
    </div>
  );
};
