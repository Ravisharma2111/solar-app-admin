import PropTypes from "prop-types";
// @mui
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Stack,
  Card,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

// ----------------------------------------------------------------------

CommonDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default function CommonDialog({
  title,
  children,
  action,
  open,
  onClose,
  ...other
}) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>
        <Card sx={{ borderRadius: "50%", mr: 2 }}>
          <IconButton size="small" onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </Card>
      </Stack>
      <DialogContent> {children} </DialogContent>

      <DialogActions>{action}</DialogActions>
    </Dialog>
  );
}
