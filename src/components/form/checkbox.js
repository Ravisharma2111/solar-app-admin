import {
  FormHelperText,
  Icon,
  InputAdornment,
  TextField,
  Box,
  Checkbox,
} from "@mui/material";
import { FormControl } from "./index";
import PropTypes from "prop-types";
import FormControlLabel from "@mui/material/FormControlLabel";

const MUICheckBox = (props) => {
  const {
    name,
    label,
    checked,
    onChange,
    value,
    color,
    fullWidth,
    helperText,
    size,
  } = props;

  return (
    <FormControl
      size={size}
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            value={value}
            onChange={onChange}
            name={name}
            color={color}
            size={size}
          />
        }
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

MUICheckBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  InputLabelProps: PropTypes.string,
  icon: PropTypes.string,
  inputAdornmentPosition: PropTypes.string,
  required: PropTypes.bool,
  multiline: PropTypes.string,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  rows: PropTypes.string,
  onKeyDown: PropTypes.func,
};

export default MUICheckBox;
