//#region Types and Enums
// These would ideally be imported from a shared types package so that it would be consistent across frontend and backend
export enum InvoiceDepartment {
    Finance = "Finance",
    Marketing = "Marketing",
}

export type InvoiceParams = {
  amount: number;
  requiresManagerApproval: boolean;
  department: InvoiceDepartment;
};

export type InvoiceCaptureParams = {
  setAmount: (amount: number) => void;
  setDepartment: (department: InvoiceDepartment) => void;
  setRequiresManagerApproval: (requiresManagerApproval: boolean) => void;
  onSendClick: () => void;
  amount: number;
  department: InvoiceDepartment;
  requiresManagerApproval: boolean;
};
//#endregion
