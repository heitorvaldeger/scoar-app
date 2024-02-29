import { TextFieldProps, TextFieldVariants } from "@mui/material";

export type InputDefaultPropsType = {
  variant: TextFieldVariants
} & Omit<TextFieldProps, 'variant'>