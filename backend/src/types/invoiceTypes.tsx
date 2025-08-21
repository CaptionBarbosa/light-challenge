export type InvoiceData = {
    amount: number;
    requiresManagerApproval: boolean;
    department: InvoiceDepartment;
}

export enum InvoiceDepartment {
    Finance = "Finance",
    Marketing = "Marketing",
}