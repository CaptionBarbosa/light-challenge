import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { InvoiceCaptureParams, InvoiceDepartment } from "../types/invoiceTypes";

const numberRegex = /^\d*\.?\d*$/;

const InvoiceCaptureForm = ({
  setAmount,
  setDepartment,
  setRequiresManagerApproval,
  onSendClick,
  amount,
  department,
  requiresManagerApproval,
}: InvoiceCaptureParams) => {
  return (
    <>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="invoice-amount">Amount</InputLabel>
        <OutlinedInput
          id="invoice-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
          inputProps={{ type: "number" }}
          required={true}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="department-label">Department</InputLabel>
        <Select
          labelId="department-label"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          label="Department"
        >
          {Object.values(InvoiceDepartment).map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="manager-approval">
          Requires Manager Approval
        </InputLabel>
        <Select
          id="manager-approval"
          value={requiresManagerApproval ? "true" : "false"}
          onChange={(e) =>
            setRequiresManagerApproval(e.target.value === "true")
          }
          label="Requires Manager Approval"
        >
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="success"
        onClick={onSendClick}
        disabled={!numberRegex.test(String(amount)) || amount <= 0}
        style={{ marginTop: "10px" }}
      >
        Send Invoice
      </Button>
    </>
  );
};

export default InvoiceCaptureForm;
