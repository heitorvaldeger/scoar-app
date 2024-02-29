import { CircularProgress } from "@mui/material";
import { LoadingDefaultProps } from "./type";

export const LoadingProgress = (props: LoadingDefaultProps) => {

  const {
    size: size = 24
  } = props;

  return (
    <CircularProgress size={size} sx={{
      color: '#000'
    }} />
  );
};
