import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";

interface AppInputProps {
  fullWidth?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  type?: string;
  id?: string;
  name?: string;
  label?: React.ReactNode;
  error?: string | null;
  value?: unknown;
  disabled?: boolean;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const AppInput = forwardRef(
  (
    {
      fullWidth,
      autoFocus,
      autoComplete,
      error,
      type,
      id,
      name,
      label,
      value,
      disabled,
      onChange,
      onBlur,
      onKeyPress,
    }: AppInputProps,
    ref
  ) => {
    return (
      <FormControl fullWidth={fullWidth} disabled={disabled}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          id={id}
          ref={ref}
          name={name}
          label={label}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        {error && (
          <Typography sx={{ pl: 1 }} variant="caption" color="error">
            {error}
          </Typography>
        )}
      </FormControl>
    );
  }
);
