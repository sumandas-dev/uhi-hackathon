import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { ReactNode } from 'react';

interface AppSelectProps {
  fullWidth?: boolean;
  id?: string;
  name?: string;
  label: string;
  value?: unknown;
  error?: string | null;
  disabled?: boolean;
  size?: 'small' | 'medium';
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  onChange?: (e: SelectChangeEvent<unknown>) => void;
  children: ReactNode;
}
export const AppSelect = ({
  fullWidth,
  id,
  name,
  label,
  value,
  error,
  size,
  disabled,
  onChange,
  onBlur,
  children,
}: AppSelectProps) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={`${id}-label`} disabled={disabled}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        labelId={`${id}-label`}
        label={label}
        fullWidth={fullWidth}
        value={value}
        size={size}
        disabled={disabled}
        onBlur={onBlur}
        onChange={onChange}
      >
        {children}
      </Select>
      {error && (
        <Typography sx={{ pl: 1 }} variant="caption" color="error">
          {error}
        </Typography>
      )}
    </FormControl>
  );
};
